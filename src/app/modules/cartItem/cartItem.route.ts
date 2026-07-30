
import { Router } from "express";
import { CartItemController } from "./cartItem.controller";
export const CartItemRoute = Router();

CartItemRoute.get('/:id',CartItemController.getCartItemByUserId);
CartItemRoute.post('/',CartItemController.addCartItem);
CartItemRoute.delete('/:id',CartItemController.deleteCartItem);