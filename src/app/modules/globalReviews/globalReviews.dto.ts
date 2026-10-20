import z from "zod";
import { addGlobalReviewSchema, updateGlobalReviewSchema } from "./globalReviews.schema";

export type CreateGlobalReviewDto = z.infer<typeof addGlobalReviewSchema>

export type UpdateGlobalReviewDto = z.infer<typeof updateGlobalReviewSchema>