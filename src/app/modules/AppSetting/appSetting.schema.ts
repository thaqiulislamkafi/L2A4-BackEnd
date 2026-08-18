import { SettingType } from "../../../generated/prisma/client";
import { z } from "zod";

const settingTypeEnum = z.nativeEnum(SettingType);

export const addAppSettingSchema = z.object({
    key: z
        .string("Setting key is required")
        .min(2, "Setting key must be at least 2 characters long")
        .max(100, "Setting key cannot exceed 100 characters"),

    value: z
        .string("Setting value is required")
        .min(1, "Setting value cannot be empty"),

    type: settingTypeEnum
});

export const updateAppSettingSchema = z.object({
    key: z
        .string()
        .min(2, "Setting key must be at least 2 characters long")
        .max(100, "Setting key cannot exceed 100 characters")
        .optional(),

    value: z
        .string()
        .min(1, "Setting value cannot be empty")
        .optional(),

    type: settingTypeEnum.optional()
});