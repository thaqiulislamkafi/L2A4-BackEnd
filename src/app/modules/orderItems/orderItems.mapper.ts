import { OrderItem, Prisma } from "../../../generated/prisma/client";

type OrderItemWithMeal = Prisma.OrderItemGetPayload<{
    include: {
        meal: true
    };
}>;

type OrderItemWithProviderMeal = Prisma.OrderItemGetPayload<{
    include: {
        meal: true
    };
}>;

type OrderItemWithUserDetails = Prisma.OrderItemGetPayload<{
    include: {
        meal: true;
        order: true;
    };
}>;

type OrderItemScalar = OrderItem;

export const OrderItemsMapper = {
    toListItem(item: OrderItemWithMeal) {
        return {
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
                image: item.meal.image
            }
        };
    },

    toList(items: OrderItemWithMeal[]) {
        return items.map((item) => OrderItemsMapper.toListItem(item));
    },

    toProviderListItem(item: OrderItemWithProviderMeal) {
        return {
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
                pricePerPiece: item.meal.pricePerPiece
            }
        };
    },

    toProviderList(items: OrderItemWithProviderMeal[]) {
        return items.map((item) => OrderItemsMapper.toProviderListItem(item));
    },

    toUserListItem(item: OrderItemWithUserDetails) {
        return {
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
                pricePerPiece: item.meal.pricePerPiece
            },
            order: {
                id: item.order.id,
                user_id: item.order.user_id,
                total_price: item.order.total_price,
                status: item.order.status,
                createdAt: item.order.createdAt
            }
        };
    },

    toUserList(items: OrderItemWithUserDetails[]) {
        return items.map((item) => OrderItemsMapper.toUserListItem(item));
    },

    toOrderItems(items: OrderItemScalar[]) {
        return items.map((item) => OrderItemsMapper.toResponse(item));
    },

    toResponse(item: OrderItemScalar) {
        return {
            id: item.id,
            order_id: item.order_id,
            meal_id: item.meal_id,
            quantity: item.quantity,
            price: item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    },

    toCreateResponse(result: { count: number }) {
        return {
            count: result.count
        };
    },

    toCancelResponse(items: OrderItemScalar[]) {
        return items.map((item) => OrderItemsMapper.toResponse(item));
    }
};