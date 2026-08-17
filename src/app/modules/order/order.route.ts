import { Router } from "express";
import { OrderController } from "./order.controller";

export const OrderRoute = Router();

OrderRoute.get("/", OrderController.getAllOrders);
OrderRoute.get("/user/:user_id", OrderController.getOrdersByUser);
OrderRoute.get("/:id", OrderController.getOrderById);

OrderRoute.post("/", OrderController.addOrder);
OrderRoute.patch("/:id/cancel", OrderController.cancelOrder);
OrderRoute.delete("/:id", OrderController.deleteOrder);
