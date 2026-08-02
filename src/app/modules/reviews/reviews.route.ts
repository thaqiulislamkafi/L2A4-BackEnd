
import { Router } from "express";
import { ReviewsController } from "./reviews.controller";

export const ReviewsRoute = Router();

ReviewsRoute.get("/", ReviewsController.getReviews) ;
ReviewsRoute.get("/meal/:mealId", ReviewsController.getReviewsByMealId) ;
ReviewsRoute.get("/:id", ReviewsController.getReviewById) ;
ReviewsRoute.get("user/:user_id",ReviewsController.getReviewsByUser)

ReviewsRoute.post("/", ReviewsController.addReview) ;
ReviewsRoute.put("/:id", ReviewsController.updateReview) ;
ReviewsRoute.delete("/:id", ReviewsController.deleteReview) ;

