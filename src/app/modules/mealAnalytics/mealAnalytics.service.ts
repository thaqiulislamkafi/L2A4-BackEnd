
import { prisma } from "../../../lib/prisma";

export const MealAnalyticsService = {

    async getMealAnalyticsData(mealId: string) {

        const result = await prisma.mealAnalytics.findUnique({
            where: {
                mealId: mealId,
            },
        });

        return result;

    },

    async addMealAnalyticsData(mealId: string,providerId:string){

        return await prisma.mealAnalytics.create({
            data: {
                mealId: mealId,
                providerId: providerId,

            },
        });
    },

    async incrementReviewAnalyticsData(mealId:string){

        await prisma.mealAnalytics.update({
            where : {
                mealId : mealId
            },
            data : {
                totalReviews : {
                    increment : 1
                }
            }
        })
    },

    async decrementReviewAnalyticsData(mealId:string){

        await prisma.mealAnalytics.update({
            where : {
                mealId : mealId
            },
            data : {
                totalReviews : {
                    decrement : 1
                }
            }
        })
    },

    async incrementOrderAnalyticsData(mealId : string){

        await prisma.mealAnalytics.update({
            where : {
                mealId
            },
            data : {
                totalOrders : {
                    increment : 1
                }
            }
        })
    },

    async decrementOrderAnalyticsData(mealId : string){

        await prisma.mealAnalytics.update({
            where : {
                mealId
            },
            data : {
                totalOrders : {
                    decrement : 1
                }
            }
        })
    }
}