import { SettingType } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { CreateAppSettingDto, UpdateAppSettingDto } from "./appSetting.dto";

export const AppSettingService = {

    async getAllSettings() {
        return await prisma.appSetting.findMany()
    },

    async getSettingById(id: string) {

        return await prisma.appSetting.findUnique({
            where: {
                id
            }
        });

    },

    async getSettingByKey(key: string) {

        return await prisma.appSetting.findMany({
            where: {
                key : {
                    startsWith : `${key}`
                }
            },
            orderBy : {
                key : "asc"
            }
        });

    },

    async getSettingsByType(type: SettingType) {

        return await prisma.appSetting.findMany({
            where: {
                type
            },
            orderBy: {
                createdAt: "asc"
            }
        });

    },

    async addSetting(data: CreateAppSettingDto) {

        return await prisma.appSetting.create({
            data
        });

    },

    async updateSetting(id: string, data: UpdateAppSettingDto) {

        return await prisma.appSetting.update({
            where: {
                id
            },
            data
        });

    },

    async deleteSetting(id: string) {

        return await prisma.appSetting.delete({
            where: {
                id
            }
        });

    },


};