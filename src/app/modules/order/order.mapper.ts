import { Order, Prisma } from "../../../generated/prisma/client";

type OrderDetailsRecord = Prisma.OrderGetPayload<{
    include: {
        orderItems: {
            include: {
                meal: {
                    select: {
                        id: true;
                        name: true;
                        image: true;
                        category_rel: true;
                    };
                };
            };
        };
        user: {
            select: {
                id: true;
                name: true;
                image: true;
                email: true;
            };
        };
    };
}>;

type OrderScalar = Order;


export const OrderMapper = {
    toListItem(order: OrderScalar) {
        return {
            id: order.id,
            user_id: order.user_id,
            provider_id: order.provider_id,
            total_price: order.total_price,
            status: order.status,
            location: order.location,
            contact: order.contact,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toListItemForProvider(order: OrderScalar) {
        return {
            id: order.id,
            user_id: order.user_id,
            total_price: order.total_price,
            status: order.status,
            location: order.location,
            contact: order.contact,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toListItemForUser(order: OrderScalar) {
        return {
            id: order.id,
            total_price: order.total_price,
            status: order.status,
            location: order.location,
            contact: order.contact,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toList(orders: OrderScalar[]) {
        return orders.map((order) => OrderMapper.toListItem(order));
    },

    toListForProviders(orders: OrderScalar[]) {
        return orders.map((order) => OrderMapper.toListItemForProvider(order));
    },

    toListForUsers(orders: OrderScalar[]) {
        return orders.map((order) => OrderMapper.toListItemForUser(order));
    },

    toDetails(order: OrderDetailsRecord | null) {
        if (!order) {
            return null;
        }

        return {
            id: order.id,
            user_id: order.user_id,
            provider_id: order.provider_id,
            total_price: order.total_price,
            status: order.status,
            location: order.location,
            contact: order.contact,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            user: {
                id: order.user.id,
                name: order.user.name,
                image: order.user.image,
                email: order.user.email
            },
            orderItems: order.orderItems.map((item) => ({
                id: item.id,
                order_id: item.order_id,
                meal_id: item.meal_id,
                quantity: item.quantity,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                meal: {
                    id: item.meal.id,
                    name: item.meal.name,
                    image: item.meal.image,
                    category_rel: item.meal.category_rel
                }
            }))
        };
    },

    toCreateResponse(order: OrderScalar) {
        return {
            id: order.id,
            user_id: order.user_id,
            provider_id: order.provider_id,
            total_price: order.total_price,
            status: order.status,
            location: order.location,
            contact: order.contact,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toCreateWithItemsResponse(order: OrderScalar, orderItems: unknown) {
        return {
            order: OrderMapper.toCreateResponse(order),
            orderItems
        };
    },

    toCancelResponse(order: Partial<OrderScalar>) {
        return {
            id: order.id,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toCancelWithItemsResponse(order: Partial<OrderScalar>, orderItems: unknown) {
        return {
            cancelledOrder: OrderMapper.toCancelResponse(order),
            cancelledOrderItems: orderItems
        };
    },

    toStatusResponse(order: OrderScalar) {
        return {
            id: order.id,
            status: order.status,
            createdAt : order.createdAt,
            updatedAt: order.updatedAt
        };
    },

    toDeleteResponse(order: OrderScalar) {
        return {
            id: order.id,
            status: order.status,
            updatedAt: order.updatedAt
        };
    }
};