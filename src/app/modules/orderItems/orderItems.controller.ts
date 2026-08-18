import { NextFunction, Request, Response } from "express";
import { OrderItemsService } from "./orderItems.service";

export const OrderItemsController = {

    async getAllOrderItems(req: Request,res: Response,next: NextFunction) {

        try {

            const result = await OrderItemsService.getAllOrderItems(req.query);

            res.status(200).send({
                success: true,
                message: "Order items fetched successfully",
                ...result
            });

        } catch (error) {
            next(error);
        }
    },


    async getOrderItemsByMealId(req: Request,res: Response,next: NextFunction) {

        try {

            const mealId = String(req.params.mealId);
            const result = await OrderItemsService.getOrderItemsByMealId(
                mealId,
                req.query
            );

            res.status(200).send({
                success: true,
                message: "Order items of the meal fetched successfully",
                ...result
            });

        } catch (error) {
            next(error);
        }
    },


    async getOrderItemByOrderId(req: Request,res: Response,next: NextFunction) {

        try {

            const orderId = String(req.params.orderId);
            const result = await OrderItemsService.getOrderItemByOrderId(
                orderId
            );

            res.status(200).send({
                success: true,
                message: "Order items of the order fetched successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },


    async getOrderItem(req: Request,res: Response,next: NextFunction) {

        try {

            const id = String(req.params.id);
            const result = await OrderItemsService.getOrderItem(id);

            res.status(200).send({
                success: true,
                message: "Order item fetched successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },


    async cancelOrderItems(req: Request,res: Response,next: NextFunction) {

        try {

            const orderId = String(req.params.orderId);
            const result = await OrderItemsService.cancelOrderItems(orderId);

            res.status(200).send({
                success: true,
                message: "Order items cancelled successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    }
};