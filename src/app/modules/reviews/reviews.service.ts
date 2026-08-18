import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"
import { User } from "../../../prisma/client"
import { getMonthAndDate } from "../../utils/getMonthAndDate"
import { QueryBuilder } from "../../utils/QueryBuilder"
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service"
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service"

export const ReviewsService = {

    async getReviews(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                ...prismaQuery,
                include: {
                    user: true,
                    meal: true
                }
            }),

            await prisma.review.count({
                where: prismaQuery.where
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

    async getReviewsByMealId(mealId: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();
        const conditionWhere = {
            ...prismaQuery.where,
            mealId
        }

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    meal: true,
                    user: true
                }
            }),

            await prisma.review.count({
                where: prismaQuery.where
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

    async getReviewsByUser(user_id: string, query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit);

        const conditionWhere = {
            ...prismaQuery.where,
            user_id
        }

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    user: true,
                    meal: true
                }
            }),

            await prisma.review.count({
                where: prismaQuery.where
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

    async getReviewById(id: string) {

        const review = await prisma.review.findUnique({
            where: {
                id: id
            },
            include: {
                meal: true,
                user: true
            }
        })

        return review
    },

    async addReview(data: Review) {

        return await prisma.$transaction(async (tx) => {

            const newReview = await tx.review.create({
                data: data
            });

            await MealAnalyticsService.incrementReviewAnalyticsData(newReview.meal_id, tx);
            const date = await getMonthAndDate(String(newReview.createdAt));
            await DashboardStatsService.incrementReviewsCreated(date.year, date.month, tx);

            return newReview;
        })
    },

    async updateReview(id: string, data: Partial<Review>, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };
        
        return await prisma.review.update({
            where: where,
            data: data
        })

    },

    async deleteReview(id: string, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        return await prisma.$transaction(async (tx) => {

            const result = await tx.review.delete({
                where: where
            })

            await MealAnalyticsService.decrementReviewAnalyticsData(result.meal_id, tx);
            const date = await getMonthAndDate(String(result.createdAt));
            await DashboardStatsService.decrementReviewsCreated(date.year, date.month, tx);

            return result;
        })


    }
}