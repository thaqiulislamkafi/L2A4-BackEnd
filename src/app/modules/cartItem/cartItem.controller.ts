import { NextFunction, Request, Response } from "express";
import { CartItemService } from "./cartItem.service";
import { CartItem } from "../../../generated/prisma/client";

export const CartItemController = {

    async getCartItemById(req: Request, res: Response, next: NextFunction) {

        try {
            const id: string = String(req.params.id);
            const cartItem = await CartItemService.getCartItemById(id);

            res.status(200).send({
                success: true,
                message: "Cart item fetched successfully by Cart Id",
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    },

    async getCartItemByCartId(req: Request, res: Response, next: NextFunction) {

        try {
            const cartId: string = String(req.params.cartId);
            const cartItems = await CartItemService.getCartItemByCartId(cartId);

            res.status(200).send({
                success: true,
                message: "Cart item fetched successfully by Cart Id",
                data: cartItems
            });
        } catch (error) {
            next(error);
        }
    },

    async getCartItemByUserId(req: Request, res: Response, next: NextFunction) {

        try {
            const userId: string = String(req.params.userId);
            const cartItem = await CartItemService.getCartItemByUserId(userId);

            res.status(200).send({
                success: true,
                message: "Cart item fetched successfully by User Id",
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    },

    async addCartItem(req: Request, res: Response, next: NextFunction) {

        try {
            const data:CartItem = req.body;
            const cartItem = await CartItemService.addCartItem(data);
            res.status(201).send({
                success: true,
                message: "Cart item added successfully",
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCartItem(req: Request, res: Response, next: NextFunction) {

        try {
            const id = String(req.params.id);
            const cartItem = await CartItemService.deleteCartItem(id);
            res.status(200).send({
                success: true,
                message: "Cart item deleted successfully",
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    }
}