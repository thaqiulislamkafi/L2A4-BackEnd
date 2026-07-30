import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"

export const MealService = {

    async getMeals() {
        const meals = await prisma.meal.findMany();
        return meals
    },

    async findMealById(id: number) {
        const meal = await prisma.meal.findUnique({
            where: {
                id: id
            }
        })
        return meal
    },

    async addMeal(data: Meal) {
        const meal = await prisma.meal.create({
            data: data
        });
        return meal;
    },

    async updateMeal(id: number, data: Partial<Meal>) {
       return await prisma.meal.update({
            where: {
                id: id
            },
            data: data
        })
    },

    async deleteMeal(id: number) {
        return await prisma.meal.delete({
            where: {
                id: id
            }
        })
        
    }
}