
import { z } from "zod";

export const addMealSchema = z.object({
    
    name: z.string("Meal name is required")
        .min(3, "Meal name must be at least 3 characters long"),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string("Description is required")
        .min(10, "Description must be at least 10 characters long"),

    cuisine_type: z.number("Cuisine type is required")
        .int("Cuisine type must be an integer")
        .positive("Cuisine type must be positive"),

    dietry_type: z.number("Dietary type is required")
        .int("Dietary type must be an integer")
        .positive("Dietary type must be positive"),

    category: z.number("Category is required")
        .int("Category must be an integer")
        .positive("Category must be positive"),

    availabilty_status: z.enum(
        ["AVAILABLE", "UNAVAILABLE"],
        "Availability status must be AVAILABLE or UNAVAILABLE"
    ),

    price: z.number("Price is required")
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative"),

    provider_id: z.string("Provider ID is required")
});

export const updateMealSchema = z.object({
    
    name: z.string()
        .min(3, "Meal name must be at least 3 characters long")
        .optional(),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .optional(),

    cuisine_type: z.number()
        .int("Cuisine type must be an integer")
        .positive("Cuisine type must be positive")
        .optional(),

    dietry_type: z.number()
        .int("Dietary type must be an integer")
        .positive("Dietary type must be positive")
        .optional(),

    category: z.number()
        .int("Category must be an integer")
        .positive("Category must be positive")
        .optional(),

    availabilty_status: z.enum(
        ["AVAILABLE", "UNAVAILABLE"],
        "Availability status must be AVAILABLE or UNAVAILABLE"
    ).optional(),

    price: z.number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
        .optional(),

    provider_id: z.string().optional()
});
