import { prisma } from "../../../lib/prisma"

export const DashboardService = {

    async adminDashboard() {

        const [tottalUsers, totalProviders, totalMeals, totalReviews, totalGlobalReviews, totalOrders,
            recentUsers, recentMeals, recentOrders
        ] = await Promise.all([

            prisma.user.count({
                where: {
                    role: 'user'
                }
            }),

            prisma.user.count({
                where: {
                    role: 'provider'
                }
            }),

            prisma.meal.count(),
            prisma.review.count(),
            prisma.globalReview.count(),
            prisma.order.count(),

            prisma.user.findMany({
                where: {
                    role: 'user'
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 5
            }),

            prisma.meal.findMany({
                take: 5
            }),

            prisma.order.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: 5
            }),
        ])

        return {
            tottalUsers,
            totalProviders,
            totalMeals,
            totalReviews,
            totalGlobalReviews,
            totalOrders,
            recentUsers,
            recentMeals,
            recentOrders
        }
    },

    async providerDashboard(provider_id: string) {

        const [totalMeals, totalOrders, totalReviews, recentMeals, recentOrders, recentReviews] =
            await Promise.all([

                prisma.meal.count({
                    where: {
                        provider_id
                    }
                }),

                prisma.orderItem.count({
                    where: {
                        meal: {
                            provider_id
                        }
                    }
                }),

                prisma.review.count({
                    where: {
                        meal: {
                            provider_id
                        }
                    }
                }),

                prisma.meal.findMany({
                    where: {
                        provider_id
                    },
                    take: 5
                }),

                prisma.orderItem.findMany({
                    where: {
                        meal: {
                            provider_id
                        }
                    }
                }),

                prisma.review.findMany({
                    where: {
                        meal: {
                            provider_id
                        }
                    }
                })
            ])

        return {
            totalMeals,
            totalOrders,
            totalReviews,
            recentMeals,
            recentOrders,
            recentReviews
        }
    },


    async userDashboard(user_id:string){

        const [totalOrders,totalOrderItems,totalReviews,totalGlobalReviews,recentOrders,recentReviews,recentGlobalReviews] = await Promise.all([

            prisma.order.count({
                where : {
                    user_id
                }
            }),

            prisma.orderItem.count({
                where : {
                    order : {
                        user_id
                    }
                }
            }),

            prisma.review.count({
                where : {
                    user_id
                }
            }),

            prisma.globalReview.count({
                where : {
                    user_id
                }
            }),

            prisma.order.findMany({
                where : {
                    user_id
                },
                orderBy : {
                    createdAt : "desc"
                },
                take : 5
            }),

            prisma.review.findMany({
                where : {
                    user_id
                },
                orderBy : {
                    createdAt : 'desc'
                },
                take : 5
            }),

            prisma.globalReview.findMany({
                where : {
                    user_id
                },
                orderBy : {
                    createdAt : 'desc'
                },
                take : 5
            })
        ])

        return {
            totalOrders,
            totalOrderItems,
            totalReviews,
            totalGlobalReviews,
            recentOrders,
            recentReviews,
            recentGlobalReviews
        }
    }
}