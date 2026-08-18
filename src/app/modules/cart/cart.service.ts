import { Cart } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"
import { TransactionClient } from "../../types/transactionClient.type"

export const CartService = {

    async getAllCarts(){

        const carts = await prisma.cart.findMany() ;
        return carts ;
        
    },

    async getCartById(id: string) {
        const cart = await prisma.cart.findUnique({
            where: { id }
        })

        return cart
    },

    async addCart(userId: string, tx : TransactionClient = prisma) {

        const existCart = await tx.cart.findUnique({
           where : {
            user_id : userId
           }
        });

        if (existCart) {
            return existCart;
        }

        const cart = await tx.cart.create({
            data: {
                user_id: userId
        }})
        return cart;
    },

    async updateCart(id: string, data: Partial<Cart>) {

        const cart = await prisma.cart.update({
            where: { id },
            data: data
        })
        return cart;
    },

    async deleteCart(id: string) {
        const cart = await prisma.cart.delete({
            where: { id }
        })
        return cart;
    }
}