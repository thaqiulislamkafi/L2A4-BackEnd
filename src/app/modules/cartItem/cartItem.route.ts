
import { Router } from "express";
import { CartItemController } from "./cartItem.controller";
import { validate } from "../../middlewares/validate";
import { addCartItemSchema } from "./cartItem.schema";

export const CartItemRoute = Router();

CartItemRoute.get('/:id',CartItemController.getCartItemById) ;
CartItemRoute.get('/cart/:cartId',CartItemController.getCartItemByCartId) ;
CartItemRoute.get('/user/:userId',CartItemController.getCartItemByUserId) ;

CartItemRoute.post('/',validate(addCartItemSchema), CartItemController.addCartItem) ;
CartItemRoute.delete('/:id',CartItemController.deleteCartItem) ;