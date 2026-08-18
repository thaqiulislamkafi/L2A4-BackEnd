

import { z } from "zod";

export const addGlobalReviewSchema = z.object({

    rating: z.number("Rating is required")
        .int("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5"),

    comment: z.string("Comment is required")
        .min(3, "Comment must be at least 3 characters long")
        .max(500, "Comment cannot exceed 500 characters")
});

export const updateGlobalReviewSchema = z.object({

    rating: z.number()
        .int("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5")
        .optional(),

    comment: z.string()
        .min(3, "Comment must be at least 3 characters long")
        .max(500, "Comment cannot exceed 500 characters")
        .optional()
});

