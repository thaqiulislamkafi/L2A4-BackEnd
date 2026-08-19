import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../types/AuthRequest.type";
import { OrderService } from "./order.service";

export const OrderController = {

    async getAllOrders(req: Request, res: Response, next: NextFunction) {

        try {

            const orders = await OrderService.getAllOrders(req.query);
            res.status(200).send({
                success: true,
                message: "Orders fetched successfully",
                ...orders
            });

        } catch (error) {
            next(error);
        }
    },

    async getOrdersByUser(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            if (!req.user) {
                throw new Error("User not found");
            }

            const user_id = String(req.params.user_id);
            const orders = await OrderService.getOrdersByUser(user_id,req.query);

            res.status(200).send({
                success: true,
                message: "User orders fetched successfully",
                ...orders
            });

        } catch (error) {
            next(error);
        }
    },

    async getOrderById(req: Request, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const order = await OrderService.getOrderById(id);

            res.status(200).send({
                success: true,
                message: "Order fetched successfully",
                data: order
            });

        } catch (error) {
            next(error);
        }
    },

    async addOrder(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            const userId = req.params.userId ;
            const result = await OrderService.addOrder(String(userId));

            res.status(201).send({
                success: true,
                message: "Order placed successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },

    async cancelOrder(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            if (!req.user) {
                throw new Error("User not found");
            }

            const orderId = String(req.params.id);
            const cancelledOrder = await OrderService.cancelOrder(orderId);

            res.status(200).send({
                success: true,
                message: "Order cancelled successfully",
                data: cancelledOrder
            });

        } catch (error) {
            next(error);
        }
    },

    async deleteOrder(req: Request, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const deletedOrder = await OrderService.deleteOrder(id);

            res.status(200).send({
                success: true,
                message: "Order deleted successfully",
                data: deletedOrder
            });

        } catch (error) {
            next(error);
        }
    }
};