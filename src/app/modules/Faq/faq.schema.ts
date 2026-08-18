import { z } from "zod";

export const addFAQSchema = z.object({

  question: z
    .string("Question is required")
    .min(5, "Question must be at least 5 characters long")
    .max(255, "Question cannot exceed 255 characters"),

  answer: z
    .string("Answer is required")
    .min(10, "Answer must be at least 10 characters long"),

  sortOrder: z
    .number("Sort order must be a number")
    .int("Sort order must be an integer")
    .nonnegative("Sort order cannot be negative")
    .optional(),

  isPublished: z
    .boolean("isPublished must be a boolean")
    .optional(),

  category : z
    .string("Category is must be string")
});

export const updateFAQSchema = z.object({
    
  question: z
    .string()
    .min(5, "Question must be at least 5 characters long")
    .max(255, "Question cannot exceed 255 characters")
    .optional(),

  answer: z
    .string()
    .min(10, "Answer must be at least 10 characters long")
    .optional(),

  sortOrder: z
    .number()
    .int("Sort order must be an integer")
    .nonnegative("Sort order cannot be negative")
    .optional(),

  isPublished: z
    .boolean()
    .optional(),

  category : z
    .string("Category is must be string")
    .optional()
});