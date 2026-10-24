import { SettingType } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { CreateAppSettingDto, UpdateAppSettingDto } from "./appSetting.dto";
import { AppSettingMapper } from "./appSetting.mapper";

export const AppSettingService = {

    async getAllSettings() {

        const result = await prisma.appSetting.findMany()
        return AppSettingMapper.toList(result);

    },

    async getSettingById(id: string) {

        const result = await prisma.appSetting.findUnique({
            where: {
                id
            }
        });
        return AppSettingMapper.toResponse(result);
    },

    async getSettingByKey(key: string) {

        const result = await prisma.appSetting.findMany({
            where: {
                key: {
                    startsWith: `${key}`
                }
            },
            orderBy: {
                key: "asc"
            }
        });
        return AppSettingMapper.toList(result)
    },

    async getSettingsByType(type: SettingType) {

        const result = await prisma.appSetting.findMany({
            where: {
                type
            },
            orderBy: {
                createdAt: "asc"
            }
        });
        return AppSettingMapper.toList(result)

    },

    async addSetting(data: CreateAppSettingDto) {

        const result = await prisma.appSetting.create({
            data
        });
        return AppSettingMapper.toCreateResponse(result);
    },

    async updateSetting(id: string, data: UpdateAppSettingDto) {

        const result = await prisma.appSetting.update({
            where: {
                id
            },
            data
        });
        return AppSettingMapper.toUpdateResponse(result);
    },

    async deleteSetting(id: string) {

        const result = await prisma.appSetting.delete({
            where: {
                id
            }
        });
        return AppSettingMapper.toDeleteResponse(result);
    },


};