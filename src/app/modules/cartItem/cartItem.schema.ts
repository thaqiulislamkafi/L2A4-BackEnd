
import { z } from "zod";

export const addCartItemSchema = z.object({

    meal_id: z.string("Meal ID is required"),
    user_id: z.string("User ID is required"),
    quantity: z.number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .default(1),

    price: z.number("Price is required")
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
});

export const updateCartItemSchema = z.object({

    meal_id: z.string().optional(),
    user_id : z.string().optional(),
    quantity: z.number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .optional(),

    price: z.number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
        .optional()
});

