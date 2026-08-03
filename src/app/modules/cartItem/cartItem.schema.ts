
import { z } from "zod";

export const addCartItemSchema = z.object({
    cart_id: z.number("Cart ID is required")
        .int("Cart ID must be an integer")
        .positive("Cart ID must be positive"),

    meal_id: z.number("Meal ID is required")
        .int("Meal ID must be an integer")
        .positive("Meal ID must be positive"),

    quantity: z.number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .default(1),

    price: z.number("Price is required")
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
});

export const updateCartItemSchema = z.object({
    cart_id: z.number()
        .int("Cart ID must be an integer")
        .positive("Cart ID must be positive")
        .optional(),

    meal_id: z.number()
        .int("Meal ID must be an integer")
        .positive("Meal ID must be positive")
        .optional(),

    quantity: z.number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .optional(),

    price: z.number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
        .optional()
});

