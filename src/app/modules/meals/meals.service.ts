import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"
import { User } from "../../../prisma/client";
import { QueryBuilder } from "../../utils/QueryBuilder";

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
                dietry_rel: true,
                cuisine_rel: true,
                category_rel: true
            }
        })
        return meal
    },

    async addMeal(data: Meal) {
        const meal = await prisma.meal.create({
            data: data
        });
        return meal;
    },

    async updateMeal(id: string, data: Partial<Meal>, user: User) {

        if (user.role === 'admin') {
            return await prisma.meal.update({
                where: {
                    id: id
                },
                data: data
            })
        }

        else {
            return await prisma.meal.update({
                where : {
                    id ,
                    provider_id : user.id
                },
                data : data
            })
        }

    },

    async deleteMeal(id: string, user: User) {

        if (user.role === 'admin') {
            return await prisma.meal.delete({
                where: {
                    id: id
                }
            })
        }
        else {
            return await prisma.meal.delete({
                where: {
                    id,
                    provider_id: user.id
                }
            })
        }


    }
}