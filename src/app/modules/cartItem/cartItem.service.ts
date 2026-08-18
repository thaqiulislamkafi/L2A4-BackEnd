import {  CartItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

export const CartItemService = {

    async getCartItemById(id:string){

        const cartItems = await prisma.cartItem.findUnique({
            where : {
                id
            }
        }) ;

        return cartItems
    },

    async getCartItemByCartId(cartId:string){

        const cartItems = await prisma.cartItem.findMany({
            where : {
                cart_id : cartId
            }
        }) ;

        return cartItems
    },

    async getCartItemByUserId(userId: string) {

        const cartItems = await prisma.cartItem.findMany({
            where: { 
                user_id : userId 
            }
        })
        return cartItems;
    },

    async addCartItem(data: CartItem) {

        const cartItem = await prisma.cartItem.create({
            data: data
        })
        return cartItem;
    },

    async deleteCartItem(id: string) {

        const cartItem = await prisma.cartItem.delete({
            where: { id }
        })
        return cartItem;
    }
}