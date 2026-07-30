import { OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

export const OrderItemsService = {

    async addOrderItems(data: OrderItem[], orderId: number) {

        const orderItemsData = data.map((item: OrderItem) => ({
            order_id: orderId,
            meal_id: item.meal_id,
            quantity: item.quantity,
            price: item.price
        }));

       const orderItems =  await prisma.orderItem.createMany({
            data: orderItemsData
        });
         return orderItems;
    }
}