
import { Meal, Prisma } from "../../../generated/prisma/client";

type MealListRecord = Prisma.MealGetPayload<{
    include: {
        cuisine_rel: true;
        category_rel: true;
        dietry_rel: true;
    };
}>;

type MealScalar = Meal;

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
            cuisine_rel: meal.cuisine_rel,
            category_rel: meal.category_rel,
            dietry_rel: meal.dietry_rel
        };
    },

    toList(meals: MealListRecord[]) {
        return meals.map((meal) => MealMapper.toListItem(meal));
    },

    toCreateResponse(meal: MealScalar) {
        return { ...meal };
    },

    toUpdateResponse(meal: MealScalar) {
        return { ...meal };
    }
};
