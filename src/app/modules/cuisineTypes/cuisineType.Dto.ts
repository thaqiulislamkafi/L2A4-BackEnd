import z from "zod";
import { addCuisineTypeSchema, updateCuisineTypeSchema } from "./cuisineType.schema";

export type CreateCuisineTypeDto = z.infer<typeof addCuisineTypeSchema>

export type UpdateCuisineTypeDto = z.infer<typeof updateCuisineTypeSchema>