import { Cart, CartItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { CartService } from "../cart/cart.service";

export const CartItemService = {

    async getCartItemByUserId(userId: string) {

        const cart:Cart = await CartService.addCart(userId) as Cart;

        const cartItem = await prisma.cartItem.findMany({
            where: { cart_id : cart.id }
        })
        return cartItem;
    },

    async addCartItem(data: CartItem,userId:string) {

        const cart:Cart = await CartService.addCart(userId) as Cart;
        data.cart_id = cart.id;

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