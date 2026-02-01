import { OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

export const OrderItemsService = {

    async addOrderItems(data:any,orderId:number) {

        const orderItemsData:OrderItem = data.map((item:any) => ({
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