import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"

export const MealService = {

    async getMeals() {
        const meals = await prisma.meal.findMany();
        return meals
    },

    async findMealsById(id:string){

        const meals = await prisma.meal.findMany({
            where : {
                provider_id : id
            },
            include : {
                provider : true ,
                category_rel : true,
                cuisine_rel : true,
                dietry_rel : true
            }
        })
        return meals
    },

    async findMealById(id: number) {
        const meal = await prisma.meal.findUnique({
            where: {
                id: id
            },
            include : {
                provider : true ,
                category_rel : true,
                cuisine_rel : true,
                dietry_rel : true
            }
        })
        return meal ;
    },

    async addMeal(data: Meal) {
        const meal = await prisma.meal.create({
            data: data
        });
        return meal;
    },

    async updateMeal(id: number, data: Partial<Meal>) {
        const updatedMeal = await prisma.meal.update({
            where: {
                id: id
            },
            data: data
        })
        return updatedMeal ;
    },

    async deleteMeal(id: number) {
        const deletedData = await prisma.meal.delete({
            where: {
                id: id
            }
        })
        return deletedData ;
    }
}