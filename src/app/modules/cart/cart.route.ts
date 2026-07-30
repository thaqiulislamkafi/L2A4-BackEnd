
import { Router } from "express";
import { CartController } from "./cart.controller";

export const CartRoute = Router();

CartRoute.get('/:id',CartController.getCartById);
CartRoute.post('/',CartController.addCart);
CartRoute.put('/:id',CartController.updateCart);
CartRoute.delete('/:id',CartController.deleteCart);