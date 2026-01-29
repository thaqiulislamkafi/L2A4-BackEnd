import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"

export const ReviewsService = {

    async getReviews(){
        const reviews = await prisma.review.findMany()
        return reviews
    },

    async getReviewsByMealId(mealId: number){
        const reviews = await prisma.review.findMany({
            where: {
                meal_id: mealId
            }
        })
        return reviews
    },

    async getReviewById(id: number){
        const review = await prisma.review.findUnique({
            where: {
                id: id
            }
        })
        return review
    },

    async addReview(data:Review){
        const newReview = await prisma.review.create({
            data: data
        })
        return newReview
    },

    async updateReview(id: number, data:Partial<Review>){
        const updatedReview = await prisma.review.update({
            where: {
                id: id
            },
            data: data
        })
        return updatedReview ;
    },

    async deleteReview(id:number) {
        const deletedReview = await prisma.review.delete({
            where: {
                id: id
            }
        })
        return deletedReview ;
    }
}