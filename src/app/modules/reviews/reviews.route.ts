
import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { validate } from "../../middlewares/validate";
import { addReviewSchema, updateReviewSchema } from "./reviews.schema";

export const ReviewsRoute = Router();

ReviewsRoute.get("/", ReviewsController.getReviews) ;
ReviewsRoute.get("/meal/:mealId", ReviewsController.getReviewsByMealId) ;
ReviewsRoute.get("/:id", ReviewsController.getReviewById) ;
ReviewsRoute.get("user/:user_id",ReviewsController.getReviewsByUser)

ReviewsRoute.post("/",validate(addReviewSchema), ReviewsController.addReview) ;
ReviewsRoute.put("/:id",validate(updateReviewSchema), ReviewsController.updateReview) ;
ReviewsRoute.delete("/:id", ReviewsController.deleteReview) ;

