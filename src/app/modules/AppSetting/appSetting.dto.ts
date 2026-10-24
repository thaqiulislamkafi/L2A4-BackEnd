import z from "zod";
import { addAppSettingSchema, updateAppSettingSchema } from "./appSetting.schema";

export type CreateAppSettingDto = z.infer<typeof addAppSettingSchema>

export type UpdateAppSettingDto = z.infer<typeof updateAppSettingSchema>