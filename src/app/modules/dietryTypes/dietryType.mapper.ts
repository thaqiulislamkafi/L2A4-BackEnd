
import { Dietrytype } from "../../../generated/prisma/client";

export const DietryTypesMapper = {

    toResponse(dietryType: Dietrytype | null) {

        if(!dietryType) return null;

        return {
            id: dietryType.id,
            dietry_type_name: dietryType.dietry_type_name,
            createdAt: dietryType.createdAt,
            updatedAt: dietryType.updatedAt,
        };
    },

    toList(dietryTypes: Dietrytype[]) {
        return dietryTypes.map((dietryType) => this.toResponse(dietryType));
    },

    toCreateResponse(dietryType: Dietrytype) {
        return {
            id: dietryType.id,
            dietry_type_name: dietryType.dietry_type_name,
        };
    },

    toUpdateResponse(dietryType: Dietrytype) {
        return {
            id: dietryType.id,
            dietry_type_name: dietryType.dietry_type_name,
        };
    },

    toDeleteResponse(dietryType: Dietrytype) {
        return {
            id: dietryType.id,
            dietry_type_name: dietryType.dietry_type_name,
        };
    },
};
