import { Router } from "express";
import { GlobalReviewsController } from "./globalReviews.controller";

export const GlobalReviewsRoute = Router();

GlobalReviewsRoute.get("/", GlobalReviewsController.getGlobalReviews);
GlobalReviewsRoute.get("/user/:user_id", GlobalReviewsController.getGlobalReviewsByUser);
GlobalReviewsRoute.get("/:id", GlobalReviewsController.getGlobalReviewById);
GlobalReviewsRoute.post("/", GlobalReviewsController.addGlobalReview);

GlobalReviewsRoute.put("/:id", GlobalReviewsController.updateGlobalReview);
GlobalReviewsRoute.delete("/:id", GlobalReviewsController.deleteGlobalReview);