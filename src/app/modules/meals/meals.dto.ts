import z from "zod";
import { addMealSchema, updateMealSchema } from "./meals.schema";

export type CreateMealDto = z.infer<typeof addMealSchema>

export type UpdateMealDto = z.infer<typeof updateMealSchema>