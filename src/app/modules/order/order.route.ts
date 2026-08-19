import { Router } from "express";
import { OrderController } from "./order.controller";
import { verifyAuth } from "../../middlewares/verifyAuth";

export const OrderRoute = Router();

OrderRoute.get("/", OrderController.getAllOrders);
OrderRoute.get("/user/:user_id",verifyAuth, OrderController.getOrdersByUser);
OrderRoute.get("/:id", OrderController.getOrderById);

OrderRoute.post("/:userId", OrderController.addOrder);
OrderRoute.put("/cancel/:id", OrderController.cancelOrder);
OrderRoute.delete("/:id", OrderController.deleteOrder);
