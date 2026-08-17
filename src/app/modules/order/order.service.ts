/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../lib/prisma"
import { getMonthAndDate } from "../../utils/getMonthAndDate";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";
import { OrderItemsService } from "../orderItems/orderItems.service";

export const OrderService = {

    async getAllOrders(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['id'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.order.findMany({
                ...prismaQuery,
                include: {
                    orderItems: {
                        include: {
                            meal: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    category_rel: true
                                }
                            },

                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            email: true
                        }
                    }

                }
            }),

            prisma.order.count({
                where: prismaQuery.where
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

    async getOrdersByUser(user_id: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['id'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const conditionWhere = {
            ...prismaQuery.where,
            user_id
        }

        const [result, total] = await Promise.all([

            await prisma.order.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    orderItems: {
                        include: {
                            meal: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    category_rel: true
                                }
                            },

                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            email: true
                        }
                    }

                }
            }),

            await prisma.order.count({
                where: conditionWhere
            })
        ])

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

    async getOrderById(id: string) {

        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                orderItems: {
                    include: {
                        meal: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                category_rel: true
                            }
                        },

                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true
                    }
                }

            }
        }) ;

        return order ;
    },

    async addOrder(data: any, userId: string) {

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

        const date = await getMonthAndDate(String(order.createdAt));
        await DashboardStatsService.incrementOrdersCreated(date.year, date.month);

        return { order, orderItems };
    },

    async cancelOrder(orderId: string, userId: string) {

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

        else if (order.status === 'PROCESSING') {
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

        const date = await getMonthAndDate(String(cancelledOrder.createdAt));
        await DashboardStatsService.decrementOrdersCreated(date.year, date.month);

        return cancelledOrder;
    },

    async deleteOrder(id:string){

        const order = await prisma.order.findUnique({
            where : {
                id
            }
        }) ;

        if(order?.status !== 'CANCELLED'){
            throw new Error('This order is not Cancelled,Only cancelled order can be deleted');
        }

        return await prisma.order.delete({
            where : {
                id,
                status : 'CANCELLED'
            }
        })
    }
}