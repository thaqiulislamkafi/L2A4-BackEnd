

import { Router } from "express";
import { ReviewsController } from "./reviews.controller";

export const ReviewsRoute = Router();

ReviewsRoute.get("/api/reviews", ReviewsController.getReviews) ;
ReviewsRoute.get("/api/reviews/meal/:mealId", ReviewsController.getReviewsByMealId) ;
ReviewsRoute.get("/api/reviews/:id", ReviewsController.getReviewById) ;
ReviewsRoute.post("/api/reviews", ReviewsController.addReview) ;
ReviewsRoute.put("/api/reviews/:id", ReviewsController.updateReview) ;
ReviewsRoute.delete("/api/reviews/:id", ReviewsController.deleteReview) ;

