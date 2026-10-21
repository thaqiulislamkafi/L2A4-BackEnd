import { prisma } from "../../../lib/prisma"
import { User } from "../../../prisma/client"
import { getMonthAndDate } from "../../utils/getMonthAndDate"
import { QueryBuilder } from "../../utils/QueryBuilder"
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service"
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service"
import { CreateReviewDto, UpdateReviewDto } from "./reviews.dto"
import { ReviewMapper } from "./reviews.mapper"

export const ReviewsService = {

    async getReviews(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                where: prismaQuery.where,
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
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
            data: ReviewMapper.toList(result),
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
        const limit = Math.min(Number(query.limit) || 6, 10);

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
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
            data: ReviewMapper.toList(result),
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
        const limit = Math.min(Number(query.limit) || 6, 10);

        const conditionWhere = {
            ...prismaQuery.where,
            user_id
        }

        const [result, total] = await Promise.all([

            await prisma.review.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                where: conditionWhere,
                include: {
                    meal: true
                }
            }),

            await prisma.review.count({
                where: prismaQuery.where
            })
        ])

        return {
            data: ReviewMapper.toListForUser(result),
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

        return ReviewMapper.toListItem(review)
    },

    async addReview(data: CreateReviewDto) {

        return await prisma.$transaction(async (tx) => {

            const newReview = await tx.review.create({
                data: data
            });

            await MealAnalyticsService.incrementReviewAnalyticsData(newReview.meal_id, tx);
            const date = await getMonthAndDate(String(newReview.createdAt));
            await DashboardStatsService.incrementReviewsCreated(date.year, date.month, tx);

            return ReviewMapper.toCreateResponse(newReview);
        })
    },

    async updateReview(id: string, data: UpdateReviewDto, user: Partial<User>) {

        const existReview = await this.getReviewById(id);
        if (!existReview) throw new Error("Review Not found");

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        const result = await prisma.review.update({
            where: where,
            data: data
        })

        return ReviewMapper.toUpdateResponse(result)
    },

    async deleteReview(id: string, user: Partial<User>) {

        const existReview = await this.getReviewById(id);
        if (!existReview) throw new Error("Review Not found");

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        return await prisma.$transaction(async (tx) => {

            const result = await tx.review.delete({
                where: where
            })

            await MealAnalyticsService.decrementReviewAnalyticsData(result.meal_id, tx);
            const date = await getMonthAndDate(String(result.createdAt));
            await DashboardStatsService.decrementReviewsCreated(date.year, date.month, tx);

            return ReviewMapper.toResponse(result);
        })


    }
}