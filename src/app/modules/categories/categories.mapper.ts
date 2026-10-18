
import { Categories } from "../../../generated/prisma/client";

export const CategoriesMapper = {

    toResponse(category: Categories | null) {

        if(!category) return null ;
        
        return {
            id: category.id,
            category_name: category.category_name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    },

    toList(categories: Categories[]) {
        return categories.map((category) => this.toResponse(category));
    },

    toCreateResponse(category: Categories) {
        return {
            id: category.id,
            category_name: category.category_name,
        };
    },

    toUpdateResponse(category: Categories) {
        return {
            id: category.id,
            category_name: category.category_name,
        };
    },

    toDeleteResponse(category: Categories) {
        return {
            id: category.id,
            category_name: category.category_name,
        };
    },
};
