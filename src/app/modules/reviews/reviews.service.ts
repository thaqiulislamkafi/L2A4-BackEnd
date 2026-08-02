import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"
import { User } from "../../../prisma/client"
import { QueryBuilder } from "../../utils/QueryBuilder"

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

    async getReviewsByMealId(mealId: number, query: Record<string, unknown>) {

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
                where : prismaQuery.where
            })
        ])

        return {
            data : result,
            meta : {
                page,
                limit,
                total,
                totalPage : Math.ceil(total / limit)
            }
        }
    },

    async getReviewById(id: number) {

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

        const newReview = await prisma.review.create({
            data: data
        })
        return newReview
    },

    async updateReview(id: number, data: Partial<Review>, user: User) {

        if (user.role === 'admin') {
            return await prisma.review.update({
                where: {
                    id: id
                },
                data: data
            })
        }

        else {
            return await prisma.review.update({
                where: {
                    id,
                    user_id: user.id
                },
                data
            })
        }
    },

    async deleteReview(id: number, user: User) {

        if (user.role === 'admin') {
            return await prisma.review.delete({
                where: {
                    id: id
                }
            })
        }

        else {
            return await prisma.review.delete({
                where: {
                    id,
                    user_id: user.id
                }
            })
        }
    }
}