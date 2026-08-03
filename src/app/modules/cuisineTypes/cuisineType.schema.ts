
import { z } from "zod";

export const addCuisineTypeSchema = z.object({
    cuisine_type_name: z.string("Cuisine type name is required")
        .min(2, "Cuisine type name must be at least 2 characters long")
        .max(100, "Cuisine type name cannot exceed 100 characters")
});

export const updateCuisineTypeSchema = z.object({
    cuisine_type_name: z.string()
        .min(2, "Cuisine type name must be at least 2 characters long")
        .max(100, "Cuisine type name cannot exceed 100 characters")
        .optional()
});

