import { Cart } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"

export const CartService = {

    async getCartById(id: number) {
        const cart = await prisma.cart.findUnique({
            where: { id }
        })
    },

    async addCart(userId: string) {

        const existCart = await prisma.cart.findUnique({
           where : {
            user_id : userId
           }
        });

        if (existCart) {
            return existCart;
        }

        const cart = await prisma.cart.create({
            data: {
                user_id: userId
        }})
        return cart;
    },

    async updateCart(id: number, data: Partial<Cart>) {

        const cart = await prisma.cart.update({
            where: { id },
            data: data
        })
        return cart;
    },

    async deleteCart(id: number) {
        const cart = await prisma.cart.delete({
            where: { id }
        })
        return cart;
    }
}