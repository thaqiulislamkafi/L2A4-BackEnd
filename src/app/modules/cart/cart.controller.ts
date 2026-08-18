import { NextFunction, Request, Response } from "express";
import { CartService } from "./cart.service";

export const CartController = {

    async getAllCarts(req:Request, res:Response,next:NextFunction) {

        try {
            const carts = await CartService.getAllCarts();
            res.status(200).send({
                success : true,
                message : 'Carts are fetched successfully',
                data : carts
            });
        } catch (error) {
            next(error);
        }
    },

    async getCartById(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const cart = await CartService.getCartById(String(id));
            res.status(200).send({
                success : true,
                message : 'Cart fetched successfully',
                data : cart
            });
        } catch (error) {
            next(error);
        }
    },

    async addCart(req:Request, res:Response,next:NextFunction) {

        try {
            const data = req.body;
            const cart = await CartService.addCart(data);
            res.status(201).send({
                success : true,
                message : 'Cart added successfully',
                data : cart
            });
        } catch (error) {
            next(error);
        }
    },

    async updateCart(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const data = req.body;
            const cart = await CartService.updateCart(String(id), data);
            res.status(200).send({
                success : true,
                message : 'Cart updated successfully',
                data : cart
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCart(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const cart = await CartService.deleteCart(String(id));
            res.status(200).send({
                success : true,
                message : 'Cart deleted successfully',
                data : cart
            });
        } catch (error) {
            next(error);
        }
    }
}