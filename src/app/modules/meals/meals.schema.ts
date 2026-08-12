
import { z } from "zod";

export const addMealSchema = z.object({
    
    name: z.string("Meal name is required")
        .min(3, "Meal name must be at least 3 characters long"),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string("Description is required")
        .min(10, "Description must be at least 10 characters long"),

    cuisine_type: z.string("Cuisine type is required"),

    dietry_type: z.string("Dietary type is required"),

    category: z.string("Category is required"),

    availabilty_status: z.string("Availability status is required"),

    price: z.number("Price is required")
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative"),

    provider_id: z.string("Provider ID is required"),

    isHeroContent: z.boolean().optional(),

    isSliderContent: z.boolean().optional()
});

export const updateMealSchema = z.object({
    
    name: z.string()
        .min(3, "Meal name must be at least 3 characters long")
        .optional(),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .optional(),

    cuisine_type: z.string().optional(),

    dietry_type: z.string().optional(),

    category: z.string().optional(),

    availabilty_status: z.string().optional(),

    price: z.number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
        .optional(),

    provider_id: z.string().optional(),

    isHeroContent: z.boolean().optional(),

    isSliderContent: z.boolean().optional()
});
