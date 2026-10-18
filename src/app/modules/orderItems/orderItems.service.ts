import { CartItem, OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { TransactionClient } from "../../types/transactionClient.type";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service";
import { MealService } from "../meals/meals.service";
import { OrderItemsMapper } from "./orderItems.mapper";

export const OrderItemsService = {

    async getAllOrderItems(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()
            .search(['id', 'order_id'])

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                where: prismaQuery.where,
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                include: {
                    meal: true
                }
            }),

            prisma.orderItem.count()
        ]);

        return {
            data: OrderItemsMapper.toList(result),
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
            .search(['id', 'order_id'])

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            meal_id: mealId
        };

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                where: conditionWhere,
                include: {
                    meal: true
                }
            }),

            prisma.orderItem.count({
                where: conditionWhere
            })
        ]);

        return {
            data: OrderItemsMapper.toList(result),
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }
    },

    async getOrderItemByOrderId(orderId: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()
            .search(['id', 'order_id'])

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            order_id: orderId
        };

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                where: conditionWhere,
                include: {
                    meal: true
                }
            }),

            prisma.orderItem.count({
                where: conditionWhere
            })
        ]);

        return {
            data: OrderItemsMapper.toList(result),
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }
    },

    async getOrderItemsByProviderId(providerId: string, query: Record<string, unknown>) {
        const qb = new QueryBuilder(query)
            .sort()
            .paginate()
            .search(['id', 'order_id']);

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            meal: {
                provider_id: providerId,
            },
        };

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([
            prisma.orderItem.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                where: conditionWhere,
                include: {
                    meal: true
                },
            }),

            prisma.orderItem.count({
                where: conditionWhere,
            }),
        ]);

        return {
            data: OrderItemsMapper.toProviderList(result),
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    },

    async getOrderItemsByUserId(userId: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()
            .search(['id', 'order_id']);

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            order: {
                user_id: userId,
            },
        };

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            prisma.orderItem.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                where: conditionWhere,
                include: {
                    meal: true,
                    order: true,
                },
            }),

            prisma.orderItem.count({
                where: conditionWhere,
            }),

        ]);

        return {
            data: OrderItemsMapper.toUserList(result),
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