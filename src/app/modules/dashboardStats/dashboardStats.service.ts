import { DashboardStats } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

export const DashboardStatsService = {

    async getAllDashboardStats() {
        return prisma.dashboardStats.findMany({
            orderBy: [
                {
                    year: "desc",
                },
                {
                    month: "asc",
                },
            ],
        });
    },

    async getDashboardStats() {

        const [totalUsers, totalMeals, totalOrders, totalReviews] = await Promise.all([

            prisma.user.count({
                where: {
                    role: 'user'
                }
            }),

            prisma.meal.count(),
            prisma.order.count(),
            prisma.review.count()
        ])

        return {
            totalUsers,
            totalMeals,
            totalOrders,
            totalReviews
        }
    },

    async getDashboardStatsById(id: string) {
        return prisma.dashboardStats.findUnique({
            where: {
                id,
            },
        });
    },

    async getDashboardStatsByMonth(month: number) {

        return prisma.dashboardStats.findFirst({
            where: {
                month: month
            }
        })
    },

    async updateDashboardStats(id: string, data: Partial<DashboardStats>) {

        return prisma.dashboardStats.update({
            where: { id },
            data,
        });
    },

    async incrementUsersJoined() {
        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                usersJoined: 1,
            },
            update: {
                usersJoined: {
                    increment: 1,
                },
            },
        });
    },

    async decrementUsersJoined(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year: year,
                    month: month,
                },
            },
            data: {
                usersJoined: {
                    decrement: 1,
                },
            },
        });
    },

    async incrementProvidersJoined() {

        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                providersJoined: 1,
            },
            update: {
                providersJoined: {
                    increment: 1,
                },
            },
        });
    },

    async decrementProvidersJoined(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year: year,
                    month: month,
                },
            },
            data: {
                providersJoined: {
                    decrement: 1,
                },
            },
        });
    },

    async incrementMealsCreated() {

        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                mealsCreated: 1,
            },
            update: {
                mealsCreated: {
                    increment: 1,
                },
            },
        });
    },

    async decrementMealsCreated(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year: year,
                    month: month,
                },
            },
            data: {
                mealsCreated: {
                    decrement: 1,
                },
            },
        });
    },

    async incrementReviewsCreated() {

        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                reviewsCreated: 1,
            },
            update: {
                reviewsCreated: {
                    increment: 1,
                },
            },
        });
    },

    async decrementReviewsCreated(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year:  year,
                    month: month,
                },
            },
            data: {
                reviewsCreated: {
                    decrement: 1,
                },
            },
        });
    },

    async incrementGlobalReviewsCreated() {

        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                globalReviewsCreated: 1,
            },
            update: {
                globalReviewsCreated: {
                    increment: 1,
                },
            },
        });
    },

    async decrementGlobalReviewsCreated(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year: year,
                    month: month,
                },
            },
            data: {
                globalReviewsCreated: {
                    decrement: 1,
                },
            },
        });
    },

    async incrementOrdersCreated() {
        const now = new Date();

        return prisma.dashboardStats.upsert({
            where: {
                year_month: {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
            create: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                ordersCreated: 1,
            },
            update: {
                ordersCreated: {
                    increment: 1,
                },
            },
        });
    },

        async decrementOrdersCreated(year:number,month:number) {

        return prisma.dashboardStats.update({
            where: {
                year_month: {
                    year: year,
                    month: month,
                },
            },
            data: {
                ordersCreated: {
                    decrement: 1,
                },
            },
        });
    },

    async getYearlyStats(year?: number) {
        const currentYear = year || new Date().getFullYear();

        return prisma.dashboardStats.findMany({
            where: {
                year: currentYear,
            },
            orderBy: {
                month: "asc",
            },
        });
    },

    async getMonthlyStats(year: number, month: number) {
        return prisma.dashboardStats.findUnique({
            where: {
                year_month: {
                    year,
                    month,
                },
            },
        });
    },
};