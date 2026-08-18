
import { prisma } from "../../../lib/prisma";
import { TransactionClient } from "../../types/transactionClient.type";

export const MealAnalyticsService = {

    async getMealAnalyticsData(mealId: string) {

        const result = await prisma.mealAnalytics.findUnique({
            where: {
                mealId: mealId,
            },
        });

        return result;

    },

    async addMealAnalyticsData(mealId: string,providerId:string ,tx : TransactionClient = prisma){

        return await tx.mealAnalytics.create({
            data: {
                mealId: mealId,
                providerId: providerId,

            },
        });
    },

    async incrementReviewAnalyticsData(mealId:string ,tx : TransactionClient = prisma){

        await tx.mealAnalytics.update({
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

    async decrementReviewAnalyticsData(mealId:string,tx : TransactionClient = prisma){

        await tx.mealAnalytics.update({
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

    async incrementOrderAnalyticsData(mealId : string ,tx : TransactionClient = prisma){

        await tx.mealAnalytics.update({
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

    async decrementOrderAnalyticsData(mealId : string ,tx : TransactionClient = prisma){

        await tx.mealAnalytics.update({
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