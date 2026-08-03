
import { z } from "zod";

export const addDietryTypeSchema = z.object({
    dietry_type_name: z.string("Dietary type name is required")
        .min(2, "Dietary type name must be at least 2 characters long")
        .max(100, "Dietary type name cannot exceed 100 characters")
});

export const updateDietryTypeSchema = z.object({
    dietry_type_name: z.string()
        .min(2, "Dietary type name must be at least 2 characters long")
        .max(100, "Dietary type name cannot exceed 100 characters")
        .optional()
});

