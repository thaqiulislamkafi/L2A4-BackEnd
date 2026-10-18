
import { Meal, Prisma } from "../../../generated/prisma/client";

type MealListRecord = Prisma.MealGetPayload<{
    include: {
        cuisine_rel: true;
        category_rel: true;
        dietry_rel: true;
    };
}>;

type MealScalar = Meal;

type MealHeroContentRecord = Prisma.MealGetPayload<{
    include: {
        mealAnalytics: true;
    };
}>;

export const MealMapper = {

    toListItem(meal: MealListRecord) {
        return {
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            cuisine_type: meal.cuisine_type,
            dietry_type: meal.dietry_type,
            category: meal.category,
            availabilty_status: meal.availabilty_status,
            pricePerPiece: meal.pricePerPiece,
            totalPieces: meal.totalPieces,
            availablePieces: meal.availablePieces,
            isPublished: meal.isPublished,
            isHeroContent: meal.isHeroContent,
            isSliderContent: meal.isSliderContent,
            provider_id: meal.provider_id,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
            cuisine_rel: {
                id: meal.cuisine_rel.id,
                cuisine_type_name: meal.cuisine_rel.cuisine_type_name
            },
            category_rel: {
                id: meal.category_rel.id,
                category_name: meal.category_rel.category_name
            },
            dietry_rel: {
                id: meal.dietry_rel.id,
                dietry_type_name: meal.dietry_rel.dietry_type_name
            }
        };
    },

    toList(meals: MealListRecord[]) {
        return meals.map((meal) => MealMapper.toListItem(meal));
    },

    toCreateResponse(meal: MealScalar) {
        return { 
            id : meal.id,
            name : meal.name,
            description: meal.description,
            provider_id : meal.provider_id,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
         };
    },

    toUpdateResponse(meal: MealScalar) {
        return { 
            id : meal.id,
            name : meal.name,
            description: meal.description,
            provider_id : meal.provider_id,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
         };
    },

    toDeleteResponse(meal: MealScalar){
        return { 
            id : meal.id,
            name : meal.name,
            provider_id : meal.provider_id,
            updatedAt: meal.updatedAt,
         };
    },

    toResponse(meal: MealScalar){
        return { 
            id : meal.id,
            name : meal.name,
         };
    },

      toHeroContentResponse(meal: MealHeroContentRecord | null) {
        
        if (!meal) {
            return null;
        }

        return {
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            cuisine_type: meal.cuisine_type,
            dietry_type: meal.dietry_type,
            category: meal.category,
            availabilty_status: meal.availabilty_status,
            pricePerPiece: meal.pricePerPiece,
            totalPieces: meal.totalPieces,
            availablePieces: meal.availablePieces,
            isPublished: meal.isPublished,
            isHeroContent: meal.isHeroContent,
            isSliderContent: meal.isSliderContent,
            provider_id: meal.provider_id,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
            mealAnalytics: meal.mealAnalytics
        };
    }
};
