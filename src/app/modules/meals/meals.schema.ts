import { z } from "zod";

export const addMealSchema = z.object({

    name: z.string("Meal name is required")
        .min(3, "Meal name must be at least 3 characters long"),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string("Description is required")
        .min(10, "Description must be at least 10 characters long"),

    cuisine_type: z.string("Cuisine type is required")
        .min(1, "Cuisine type is required"),

    dietry_type: z.string("Dietary type is required")
        .min(1, "Dietary type is required"),

    category: z.string("Category is required")
        .min(1, "Category is required"),

    availabilty_status: z.string("Availability status is required")
        .min(1, "Availability status is required"),

    pricePerPiece: z.number("Price per piece is required")
        .int("Price per piece must be an integer")
        .nonnegative("Price per piece cannot be negative"),

    totalPieces: z.number("Total pieces is required")
        .int("Total pieces must be an integer")
        .positive("Total pieces must be greater than 0"),

    availablePieces: z.number("Available pieces is required")
        .int("Available pieces must be an integer")
        .nonnegative("Available pieces cannot be negative"),

    isPublished: z.boolean().optional(),
    isHeroContent: z.boolean().optional(),
    isSliderContent: z.boolean().optional(),
    provider_id: z.string("Provider ID is required")
        .min(1, "Provider ID is required")
});


export const updateMealSchema = z.object({

    name: z.string()
        .min(3, "Meal name must be at least 3 characters long")
        .optional(),

    image: z.url("Image must be a valid URL").optional(),

    description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .optional(),

    cuisine_type: z.string()
        .min(1, "Cuisine type is required")
        .optional(),

    dietry_type: z.string()
        .min(1, "Dietary type is required")
        .optional(),

    category: z.string()
        .min(1, "Category is required")
        .optional(),

    availabilty_status: z.string()
        .min(1, "Availability status is required")
        .optional(),

    pricePerPiece: z.number()
        .int("Price per piece must be an integer")
        .nonnegative("Price per piece cannot be negative")
        .optional(),

    totalPieces: z.number()
        .int("Total pieces must be an integer")
        .positive("Total pieces must be greater than 0")
        .optional(),

    availablePieces: z.number()
        .int("Available pieces must be an integer")
        .nonnegative("Available pieces cannot be negative")
        .optional(),

    isPublished: z.boolean().optional(),
    isHeroContent: z.boolean().optional(),
    isSliderContent: z.boolean().optional(),
    provider_id: z.string()
        .min(1, "Provider ID is required")
        .optional()
});