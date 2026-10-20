import z from "zod";
import { addCategorySchema, updateCategorySchema } from "./categories.schema";

export type CreateCategoryDto = z.infer<typeof addCategorySchema>

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>