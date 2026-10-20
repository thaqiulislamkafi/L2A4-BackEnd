import z from "zod";
import { addReviewSchema, updateReviewSchema } from "./reviews.schema";

export type CreateReviewDto = z.infer<typeof addReviewSchema>

export type UpdateReviewDto = z.infer<typeof updateReviewSchema>