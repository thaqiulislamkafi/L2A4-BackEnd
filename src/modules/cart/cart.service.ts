import { Cart } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"

export const CartService = {

    async getCartById(id: number) {
        const cart = await prisma.cart.findUnique({
            where: { id }
        })
    },

    async addCart(data: Cart) {

        const existCart = await prisma.cart.findUnique({
            where: { id: data.id }
        });

        if (existCart) {
            throw new Error('Cart already exists');
        }

        const cart = await prisma.cart.create({
            data: data
        })
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