import {  CartItem } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { TransactionClient } from "../../types/transactionClient.type";

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
            },
            include : {
                meal : {
                    select : {
                        id :true,
                        name : true,
                        image : true,
                        pricePerPiece : true,
                        availablePieces : true
                    }
                }
            }
        }) ;

        return cartItems
    },

    async getCartItemByUserId(userId: string, tx: TransactionClient = prisma) {

        const cartItems = await tx.cartItem.findMany({
            where: { 
                user_id : userId 
            },
            include : {
                meal : {
                    select : {
                        id :true,
                        name : true,
                        image : true,
                        pricePerPiece : true,
                        availablePieces : true
                    }
                }
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
    },

    async deleteCartItems(cartId:string,tx : TransactionClient = prisma){

        const cartItems = await tx.cartItem.deleteMany({
            where : {
                cart_id : cartId
            }
        })

        return cartItems ;
    }
}