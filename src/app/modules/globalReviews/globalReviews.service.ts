import { GlobalReview } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../prisma/client";
import { QueryBuilder } from "../../utils/QueryBuilder";

export const GlobalReviewsService = {

    async getGlobalReviews(query: Record<string, unknown> = {}) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate();

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.globalReview.findMany({
                ...prismaQuery,
                include: {
                    user: true
                }
            }),

            prisma.globalReview.count({
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
        };
    },

    async getGlobalReviewsByUser(user_id: string, query: Record<string, unknown> = {}) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate();

        const prismaQuery = qb.build();

        const conditionWhere = {
            ...prismaQuery.where,
            user_id
        };

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.globalReview.findMany({
                ...prismaQuery,
                where: conditionWhere,
                include: {
                    user: true
                }
            }),

            prisma.globalReview.count({
                where: conditionWhere
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
        };
    },

    async getGlobalReviewById(id: string) {

        const review = await prisma.globalReview.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        });

        return review;
    },

    async addGlobalReview(data: GlobalReview) {

        const newReview = await prisma.globalReview.create({
            data
        });

        return newReview;
    },

    async updateGlobalReview(id: string, data: Partial<GlobalReview>, user: User) {

        const existingReview = await prisma.globalReview.findUnique({
            where: { id }
        });

        if (!existingReview) {
            throw new Error("Global review not found");
        }

        if (user.role === 'admin') {

            return await prisma.globalReview.update({
                where: { id },
                data
            });
        }

        if (existingReview.user_id !== user.id) {
            throw new Error("You are not authorized to update this review");
        }

        return await prisma.globalReview.update({
            where: { id },
            data
        });
    },

    async deleteGlobalReview(id: string, user: User) {

        const existingReview = await prisma.globalReview.findUnique({
            where: { id }
        });

        if (!existingReview) {
            throw new Error("Global review not found");
        }

        if (user.role === 'admin') {

            return await prisma.globalReview.delete({
                where: { id }
            });
        }

        if (existingReview.user_id !== user.id) {
            throw new Error("You are not authorized to delete this review");
        }

        return await prisma.globalReview.delete({
            where: { id }
        });
    }
};