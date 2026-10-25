/* eslint-disable @typescript-eslint/no-unused-vars */
import { GlobalReview } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../prisma/client";
import { getMonthAndDate } from "../../utils/getMonthAndDate";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";
import { CreateGlobalReviewDto, UpdateGlobalReviewDto } from "./globalReviews.dto";
import { GlobalReviewsMapper } from "./globalReviews.mapper";

export const GlobalReviewsService = {

    async getGlobalReviews(query: Record<string, unknown> = {}) {

        const qb = new QueryBuilder(query)
            .sort()
            .paginate();

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Math.min(Number(query.limit) || 6, 10);


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
            data: GlobalReviewsMapper.toList(result),
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
        const limit = Math.min(Number(query.limit) || 6, 10);


        const [result, total] = await Promise.all([

            prisma.globalReview.findMany({
                orderBy: prismaQuery.orderBy,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
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
            data: GlobalReviewsMapper.toListWithUser(result),
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

        return GlobalReviewsMapper.toResponseWithUser(review);
    },

    async addGlobalReview(data: CreateGlobalReviewDto) {

        return await prisma.$transaction(async (tx) => {

            const newReview = await tx.globalReview.create({
                data
            });

            const date = await getMonthAndDate(String(newReview.createdAt));
            await DashboardStatsService.incrementGlobalReviewsCreated(date.year, date.month, tx);

            return GlobalReviewsMapper.toCreateResponse(newReview);
        })
    },

    async updateGlobalReview(id: string, data: UpdateGlobalReviewDto, user: Partial<User>) {

        const where = user.role === 'admin' ? { id } : { id, user_id: user.id };

        const result = await prisma.globalReview.update({
            where: where,
            data
        });
        return GlobalReviewsMapper.toUpdateResponse(result);
    },

    async deleteGlobalReview(id: string, user: Partial<User>) {

        const where = user.role === 'user' ? { id, user_id: user.id } : { id };

        return await prisma.$transaction(async (tx) => {

            const result = await tx.globalReview.delete({
                where: where
            });

            const date = await getMonthAndDate(String(result.createdAt))
            await DashboardStatsService.decrementGlobalReviewsCreated(date.year, date.month, tx);

            return GlobalReviewsMapper.toDeleteResponse(result);
        })
    }

}
