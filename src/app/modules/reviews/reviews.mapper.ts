import { Prisma, Review } from "../../../generated/prisma/client";

type ReviewScalar = Review

type ReviewListRecord = Prisma.ReviewGetPayload<{
    include: {
        user: true,
        meal: true
    }
}>;

type ReviewListRecordForUser = Prisma.ReviewGetPayload<{
    include: {
        meal: true
    }
}>;

export const ReviewMapper = {

    toListItem(review: ReviewListRecord | null) {

        if(!review) return null

        return {
            id: review.id,
            meal_id: review.meal_id,
            user_id: review.user_id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            user: {
                id: review.user.id,
                name: review.user.name,
                image: review.user.image,
                email: review.user.email,
                status: review.user.status,
                emailVerified: review.user.emailVerified,
                age: review.user.age,
            },
            meal: {
                name: review.meal.name,
                id: review.meal.id,
                image: review.meal.image,
                description: review.meal.description,
                provider_id: review.meal.provider_id
            }
        }
    },

    toListItemForUser(review: ReviewListRecordForUser | null) {

        if(!review) return null

        return {
            id: review.id,
            meal_id: review.meal_id,
            user_id: review.user_id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            meal: {
                name: review.meal.name,
                id: review.meal.id,
                image: review.meal.image,
                description: review.meal.description,
                provider_id: review.meal.provider_id
            }
        }

    },

    toList(reviews: ReviewListRecord[]) {
        return reviews.map((review) => ReviewMapper.toListItem(review));
    },

    toListForUser(reviews: ReviewListRecordForUser[]) {
        return reviews.map((review) => ReviewMapper.toListItemForUser(review));
    },
    
    toCreateResponse(review: ReviewScalar) {
        return {
            id: review.id,
            meal_id: review.meal_id,
            user_id: review.user_id,
            createdAt: review.createdAt,
        }
    },

    toUpdateResponse(review: ReviewScalar) {
        return {
            id: review.id,
            meal_id: review.meal_id,
            user_id: review.user_id,
            createdAt: review.createdAt,
            updateAt: review.updatedAt
        }
    },

    toResponse(review: ReviewScalar) {
        return {
            id: review.id,
            updateAt: review.updatedAt
        }
    }

}

