import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"
import { User } from "../../../prisma/client";
import { TransactionClient } from "../../types/transactionClient.type";
import { getMonthAndDate } from "../../utils/getMonthAndDate";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service";

export const MealService = {

    async getMeals(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['name'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.meal.findMany({
                ...prismaQuery,
                include: {
                    cuisine_rel: true,
                    dietry_rel: true,
                    category_rel: true
                }
            }),
            prisma.meal.count({
                where: prismaQuery.where
            })
        ]);

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }
    },

     async getPublishedMeals(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['name'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const conditionWhere = {
            ...prismaQuery.where,
            isPublished : true
        }

        const [result, total] = await Promise.all([

            await prisma.meal.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    cuisine_rel: true,
                    category_rel: true,
                    dietry_rel: true
                }
            }),

            await prisma.meal.count({
                where: conditionWhere
            })
        ])

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }

    },

    async getMealsByProvider(provider_id: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['name'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const conditionWhere = {
            ...prismaQuery.where,
            provider_id
        }

        const [result, total] = await Promise.all([

            await prisma.meal.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    cuisine_rel: true,
                    category_rel: true,
                    dietry_rel: true
                }
            }),

            await prisma.meal.count({
                where: conditionWhere
            })
        ])

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }

    },

    async findMealById(id: string) {

        const meal = await prisma.meal.findUnique({
            where: {
                id: id
            },
            include: {
                provider: true,
                reviews: true,
                mealAnalytics : true,
                dietry_rel: true,
                cuisine_rel: true,
                category_rel: true
            }
        })
        return meal
    },

    async addMeal(data: Meal) {

        return await prisma.$transaction(async (tx) => {

            const meal = await tx.meal.create({
                data: data
            });

            const date = await getMonthAndDate(String(meal.createdAt));
            await DashboardStatsService.incrementMealsCreated(date.year, date.month, tx);
            await MealAnalyticsService.addMealAnalyticsData(meal.id, meal.provider_id, tx);

            return meal;
        })
    },

    async updateMeal(id: string, data: Partial<Meal>, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        return await prisma.meal.update({
            where: where,
            data: data
        })

    },

    async deleteMeal(id: string, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        return await prisma.$transaction(async (tx) => {

            const result = await tx.meal.delete({
                where: where
            })

            const date = await getMonthAndDate(String(result.createdAt));
            await DashboardStatsService.decrementMealsCreated(date.year, date.month, tx);
        })

    },

    async incrementMealQuantity(mealId: string, quantity: number, tx: TransactionClient = prisma) {

        const result = await tx.meal.update({
            where: {
                id: mealId
            },
            data: {
                totalPieces: {
                    increment: quantity
                }
            }
        });

        return result;
    },

    async decrementMealQuantity(mealId: string, quantity: number, tx: TransactionClient = prisma) {

        const result = await tx.meal.update({
            where: {
                id: mealId
            },
            data: {
                totalPieces: {
                    decrement: quantity
                }
            }
        });

        return result;
    },


    async markMealHeroContent(mealId: string) {

        return await prisma.$transaction(async (tx) => {

            const isExist = await this.getMealHeroContent(tx);
            if (isExist) await this.unMarkMealHeroContent(isExist.id, tx);

            const result = await tx.meal.update({
                where: {
                    id: mealId
                },
                data: {
                    isHeroContent: true
                }
            });

            return result;
        })
    },

    async unMarkMealHeroContent(mealId: string, tx: TransactionClient = prisma) {

        const result = await tx.meal.update({
            where: {
                id: mealId
            },
            data: {
                isHeroContent: false
            }
        });

        return result;
    },

    async getMealHeroContent(tx: TransactionClient = prisma) {

        const result = await tx.meal.findFirst({
            where: {
                isHeroContent: true
            },
            include : {
                mealAnalytics : true
            }
        })

        return result;
    },

    async manageMealSliderContent(mealId:string,isSliderContent:boolean){

        const result = await prisma.meal.update({
            where: {
                id: mealId
            },
            data: {
                isSliderContent: isSliderContent
            }
        });

        return result;
    },

    async getMealSliderContents(){

        const result = await prisma.meal.findMany({
            where : {
                isSliderContent : true
            }
        }) ;

        return result ;
    },

    async manageMealPublish(mealId:string,isPublished : boolean){

        const result = await prisma.meal.update({
            where : {
                id : mealId
            },
            data : {
                isPublished : isPublished
            }
        }) ;

        return result ;
    }
}