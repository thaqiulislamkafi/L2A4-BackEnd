import { prisma } from "../../../lib/prisma"
import { OrderItemsService } from "../orderItems/orderItems.service";

export const OrderService = {

    async placeOrder(data: any, userId: string) {

        const cart = await prisma.cart.findFirst({
            where: {
                user_id: userId
            },
            include: {
                cartItems: true
            }
        });

        if (!cart || cart.cartItems.length === 0) {
            throw new Error("Cart is empty or does not exist");
        }

        const order = await prisma.order.create({
            data: {
                user_id: userId,
                total_price: cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
        });

        const orderItems = await OrderItemsService.addOrderItems(cart.cartItems, order.id);

        await prisma.cartItem.deleteMany({
            where: {
                cart_id: cart.id
            }
        });

        return { order, orderItems };
    },

    async cancelOrder(orderId: number, userId: string) {

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                user_id: userId
            }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.status === 'CANCELLED') {
            throw new Error("Order is already cancelled");
        }

        else if(order.status === 'PROCESSING') {
            throw new Error("Approved orders cannot be cancelled");
        }

        const cancelledOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: 'CANCELLED'
            }
        });

        return cancelledOrder;
    }
}