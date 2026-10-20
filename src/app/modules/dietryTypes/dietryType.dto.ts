import z from "zod";
import { addDietryTypeSchema, updateDietryTypeSchema } from "./dietryType.schema";

export type CreateDietryTypeDto = z.infer<typeof addDietryTypeSchema>

export type UpdateDietryTypeDto = z.infer<typeof updateDietryTypeSchema>