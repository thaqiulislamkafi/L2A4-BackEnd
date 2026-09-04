/* eslint-disable @typescript-eslint/no-unused-vars */
import { GlobalReview } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../prisma/client";
import { getMonthAndDate } from "../../utils/getMonthAndDate";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";

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

        return await prisma.$transaction(async (tx) => {

            const newReview = await tx.globalReview.create({
                data
            });

            const date = await getMonthAndDate(String(newReview.createdAt));
            await DashboardStatsService.incrementGlobalReviewsCreated(date.year, date.month, tx);

            return newReview;
        })
    },

    async updateGlobalReview(id: string, data: Partial<GlobalReview>, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        return await prisma.globalReview.update({
            where: where,
            data
        });

    },

    async deleteGlobalReview(id: string, user: Partial<User>) {

        const where = user.role === 'user' ? { id, user_id: user.id } : { id };

        return await prisma.$transaction(async (tx) => {

            const result = await tx.globalReview.delete({
                where: where
            });

            const date = await getMonthAndDate(String(result.createdAt))
            await DashboardStatsService.decrementGlobalReviewsCreated(date.year, date.month, tx);

            return result;
        })
    }

}
