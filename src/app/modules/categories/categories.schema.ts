
import { z } from "zod";

export const addCategorySchema = z.object({
    category_name: z.string("Category name is required")
        .min(2, "Category name must be at least 2 characters long")
        .max(100, "Category name cannot exceed 100 characters")
});

export const updateCategorySchema = z.object({
    category_name: z.string()
        .min(2, "Category name must be at least 2 characters long")
        .max(100, "Category name cannot exceed 100 characters")
        .optional()
});

