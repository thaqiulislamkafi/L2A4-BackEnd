import { Cart, CartItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { CartService } from "../cart/cart.service";

export const CartItemService = {

    async getCartItemById(id: number) {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id }
        })
        return cartItem;
    },

    async addCartItem(data: CartItem,userId:string) {

        const cart:Cart = await CartService.addCart({ userId:userId} as any);

        const existCartItem = await prisma.cartItem.findUnique({
            where: { 
                cart_id : cart.id,
                id: data.id }
        });

        if (existCartItem) {
            throw new Error('CartItem already exists');
        }

        const cartItem = await prisma.cartItem.create({
            data: data
        })
        return cartItem;
    },

    async deleteCartItem(id: number) {
        const cartItem = await prisma.cartItem.delete({
            where: { id }
        })
        return cartItem;
    }
}