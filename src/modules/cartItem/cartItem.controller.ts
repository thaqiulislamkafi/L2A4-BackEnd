import { NextFunction, Request, Response } from "express";
import { CartItemService } from "./cartItem.service";

export const CartItemController = {

    async getCartItemByUserId(req:Request, res:Response,next:NextFunction) {

        try {
            const userId:string = String(req.params.id);
            const cartItem = await CartItemService.getCartItemByUserId(userId);

            res.status(200).send({
                success : true,
                message : "Cart item fetched successfully",
                data : cartItem
            });
        } catch (error) {
            next(error);
        }
    },

    async addCartItem(req:Request, res:Response,next:NextFunction) {

        try {
            const data = req.body;
            const userId = req.query.userId as string;
            const cartItem = await CartItemService.addCartItem(data,userId);
            res.status(201).send({
                success : true,
                message : "Cart item added successfully",
                data : cartItem
                });
        } catch (error) {
            next(error);
        }
    },

    async deleteCartItem(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const cartItem = await CartItemService.deleteCartItem(id);
            res.status(200).send({         
                success : true,
                message : "Cart item deleted successfully",
                data : cartItem
                });
        } catch (error) {
            next(error);
        }
    }
}