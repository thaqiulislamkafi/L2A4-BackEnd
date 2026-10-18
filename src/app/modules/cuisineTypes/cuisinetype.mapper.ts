
import { Cuisinetype } from "../../../generated/prisma/client";

export const CuisineTypeMapper = {

    toResponse(cuisineType: Cuisinetype | null) {

        if(!cuisineType) return null ;
        
        return {
            id: cuisineType.id,
            cuisine_type_name: cuisineType.cuisine_type_name,
            createdAt: cuisineType.createdAt,
            updatedAt: cuisineType.updatedAt,
        };
    },

    toList(cuisineTypes: Cuisinetype[]) {
        return cuisineTypes.map((cuisineType) => this.toResponse(cuisineType));
    },

    toCreateResponse(cuisineType: Cuisinetype) {
        return {
            id: cuisineType.id,
            cuisine_type_name: cuisineType.cuisine_type_name,
        };
    },

    toUpdateResponse(cuisineType: Cuisinetype) {
        return {
            id: cuisineType.id,
            cuisine_type_name: cuisineType.cuisine_type_name,
        };
    },

    toDeleteResponse(cuisineType: Cuisinetype) {
        return {
            id: cuisineType.id,
            cuisine_type_name: cuisineType.cuisine_type_name,
        };
    },
};
