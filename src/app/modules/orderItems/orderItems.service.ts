import { CartItem, OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { TransactionClient } from "../../types/transactionClient.type";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service";
import { MealService } from "../meals/meals.service";

export const OrderItemsService = {

    async getAllOrderItems(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                ...prismaQuery,
                include: {
                    meal: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                }
            }),

            prisma.orderItem.count()
        ]);

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }

    },

    async getOrderItemsByMealId(mealId: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            meal_id: mealId
        };

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    meal: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                }
            }),

            prisma.orderItem.count({
                where: conditionWhere
            })
        ]);

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }
    },

    async getOrderItemByOrderId(orderId: string) {

        return await prisma.orderItem.findMany({
            where: {
                order_id: orderId
            }
        })
    },

    async getOrderItemsByProviderId(providerId: string, query: Record<string, unknown>) {
        const qb = new QueryBuilder(query)
            .sort()
            .paginate();

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            meal: {
                provider_id: providerId,
            },
        };

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([
            prisma.orderItem.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    meal: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            pricePerPiece: true,
                        },
                    },
                    order: {
                        select: {
                            id: true,
                            user_id: true,
                            total_price: true,
                            status: true,
                            createdAt: true,
                        },
                    },
                },
            }),

            prisma.orderItem.count({
                where: conditionWhere,
            }),
        ]);

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    },

    async getOrderItem(id: string) {

        return await prisma.orderItem.findUnique({
            where: {
                id
            }
        })
    },

    async addOrderItems(data: CartItem[], orderId: string, tx: TransactionClient = prisma) {

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
            MealAnalyticsService.incrementOrderAnalyticsData(String(item.meal_id), tx)
        ));

        await Promise.all(data.map((item: CartItem) =>
            MealService.decrementMealQuantity(String(item.meal_id), Number(item.quantity), tx)
        ));

        return orderItems;

    },

    async cancelOrderItems(orderId: string, tx: TransactionClient = prisma) {

        const orderItems = await tx.orderItem.findMany({
            where: {
                order_id: orderId
            }
        });

        await Promise.all(orderItems.map((item: OrderItem) =>
            MealAnalyticsService.decrementOrderAnalyticsData(String(item.meal_id), tx)
        )
        );

        await Promise.all(orderItems.map((item: OrderItem) =>
            MealService.incrementMealQuantity(String(item.meal_id), Number(item.quantity), tx)
        ));

        return orderItems;
    }
}