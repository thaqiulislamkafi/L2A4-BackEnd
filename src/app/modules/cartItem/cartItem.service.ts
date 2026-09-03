import { CartItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { TransactionClient } from "../../types/transactionClient.type";
import { CartService } from "../cart/cart.service";

export const CartItemService = {

    async getCartItemById(id: string) {

        const cartItems = await prisma.cartItem.findUnique({
            where: {
                id
            }
        });

        return cartItems
    },

    async getCartItemByCartId(cartId: string) {

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cart_id: cartId
            },
            include: {
                meal: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        pricePerPiece: true,
                        availablePieces: true
                    }
                }
            }
        });

        return cartItems
    },

    async getCartItemByUserId(userId: string, tx: TransactionClient = prisma) {

        const cartItems = await tx.cartItem.findMany({
            where: {
                user_id: userId
            },
            include: {
                meal: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        pricePerPiece: true,
                        availablePieces: true,
                        provider_id : true
                    }
                }
            }
        })
        return cartItems;
    },

    async addCartItem(data: CartItem) {
        const cart = await CartService.getCartByUserId(data.user_id);

        if (!cart) {
            throw new Error("Cart is not found");
        }

        const meal = await prisma.meal.findUnique({
            where: {
                id: data.meal_id
            },
            select: {
                id: true,
                provider_id: true,
                pricePerPiece: true,
                availablePieces: true
            }
        });

        if (!meal) {
            throw new Error("Meal is not found");
        }

        if (meal.availablePieces < data.quantity) {
            throw new Error("Requested quantity is not available");
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cart_id: cart.id
            },
            include: {
                meal: {
                    select: {
                        provider_id: true
                    }
                }
            }
        });

        if (existingCartItem && existingCartItem.meal.provider_id !== meal.provider_id) {
            throw new Error("You can only add meals from the same provider to your cart");
        }

        data.cart_id = cart.id;
        data.price = meal.pricePerPiece;

        const cartItem = await prisma.cartItem.create({
            data
        });

        return cartItem;
    },

    async deleteCartItem(id: string) {

        const cartItem = await prisma.cartItem.delete({
            where: { id }
        })
        return cartItem;
    },

    async deleteCartItems(cartId: string, tx: TransactionClient = prisma) {

        const cartItems = await tx.cartItem.deleteMany({
            where: {
                cart_id: cartId
            }
        })

        return cartItems;
    }
}