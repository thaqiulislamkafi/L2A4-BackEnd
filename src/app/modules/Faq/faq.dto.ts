import z from "zod";
import { addFAQSchema, updateFAQSchema } from "./faq.schema";

export type CreateFaqDto = z.infer<typeof addFAQSchema>

export type UpdateFaqDto = z.infer<typeof updateFAQSchema>