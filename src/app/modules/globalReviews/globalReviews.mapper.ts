
import { GlobalReview, Prisma } from "../../../generated/prisma/client";

type GlobalReviewWithUser = Prisma.GlobalReviewGetPayload<{
    include: { user: true };
}>;

export const GlobalReviewsMapper = {
    toResponse(review: GlobalReview) {
        return {
            id: review.id,
            user_id: review.user_id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    },

    toResponseWithUser(review: GlobalReviewWithUser | null) {

        if(!review) return null ;
        return {
            ...this.toResponse(review),
            user: {
                id: review.user.id,
                name: review.user.name,
                email : review.user.email,
                emailVerified : review.user.emailVerified,
                image: review.user.image,
            },
        };
    },

    toList(reviews: GlobalReview[]) {
        return reviews.map((review) => this.toResponse(review));
    },

    toListWithUser(reviews: GlobalReviewWithUser[]) {
        return reviews.map((review) => this.toResponseWithUser(review));
    },

    toPaginatedResponse<T>(
        data: T[],
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        },
    ) {
        return { data, meta };
    },

    toCreateResponse(review: GlobalReview) {
         return {
            id: review.id,
            user_id: review.user_id,
            createdAt: review.createdAt,
        };
    },

    toUpdateResponse(review: GlobalReview) {
         return {
            id: review.id,
            user_id: review.user_id,
            updatedAt: review.updatedAt,
        };
    },

    toDeleteResponse(review: GlobalReview) {
        return {
            id: review.id,
            user_id: review.user_id,
        };
    },
};
