import { Router } from "express";
import { OrderItemsController } from "./orderItems.controller";

export const OrderItemsRoute = Router();

OrderItemsRoute.get("/",OrderItemsController.getAllOrderItems);
OrderItemsRoute.get("/meal/:mealId",OrderItemsController.getOrderItemsByMealId);

OrderItemsRoute.get("/order/:orderId",OrderItemsController.getOrderItemByOrderId);
OrderItemsRoute.get("/provider/:providerId",OrderItemsController.getOrderItemsByProviderId);

OrderItemsRoute.get("/:id",OrderItemsController.getOrderItem);

OrderItemsRoute.delete("/order/:orderId",OrderItemsController.cancelOrderItems);