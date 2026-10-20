import z from "zod";
import { addCartItemSchema, updateCartItemSchema } from "./cartItem.schema";

export type CreateCartItemDto = z.infer<typeof addCartItemSchema>

export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>