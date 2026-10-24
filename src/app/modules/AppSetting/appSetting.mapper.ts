
import { AppSetting } from "../../../generated/prisma/client";

export const AppSettingMapper = {
    toResponse(setting: AppSetting | null) {

        if(!setting) return null ;
        return {
            id: setting.id,
            key: setting.key,
            value: setting.value,
            type: setting.type,
            createdAt: setting.createdAt,
            updatedAt: setting.updatedAt,
        };
    },

    toList(settings: AppSetting[]) {
        return settings.map((setting) => this.toResponse(setting));
    },

    toCreateResponse(setting: AppSetting) {
        return {
            id: setting.id,
            key: setting.key,
            createdAt: setting.createdAt,
        };
    },

    toUpdateResponse(setting: AppSetting) {
        return {
            id: setting.id,
            key: setting.key,
            updatedAt: setting.updatedAt,
        };
    },

    toDeleteResponse(setting: AppSetting) {
        return {
            id: setting.id,
            key: setting.key,
        };
    },
};
