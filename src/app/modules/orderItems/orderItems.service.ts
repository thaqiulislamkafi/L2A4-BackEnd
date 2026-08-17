import { CartItem, OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service";

export const OrderItemsService = {

    async addOrderItems(data: CartItem[], orderId: string) {

        return await prisma.$transaction(async (tx) => {

            const orderItemsData = data.map((item: CartItem) => ({
                order_id: orderId,
                meal_id: item.meal_id,
                quantity: item.quantity,
                price: item.price
            }));

            const orderItems = await tx.orderItem.createMany({
                data: orderItemsData
            });

            await Promise.all(data.map((item: CartItem) =>
                MealAnalyticsService.incrementOrderAnalyticsData(String(item.meal_id))
            )
            );

            return orderItems;
        })
    },

    async cancelOrderItems(orderId: string) {

        return await prisma.$transaction(async (tx) => {

            const orderItems = await tx.orderItem.findMany({
                where: {
                    order_id: orderId
                }
            });

            await Promise.all(orderItems.map((item: OrderItem) =>
                MealAnalyticsService.decrementOrderAnalyticsData(String(item.meal_id))
            )
            );
        })
    }
}