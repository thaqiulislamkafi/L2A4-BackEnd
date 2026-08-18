import { Router } from "express";
import { GlobalReviewsController } from "./globalReviews.controller";
import { validate } from "../../middlewares/validate";
import { addGlobalReviewSchema, updateGlobalReviewSchema } from "./globalReviews.schema";
import { verifyAuth } from "../../middlewares/verifyAuth";

export const GlobalReviewsRoute = Router();

GlobalReviewsRoute.get("/", GlobalReviewsController.getGlobalReviews);
GlobalReviewsRoute.get("/user/:user_id", GlobalReviewsController.getGlobalReviewsByUser);
GlobalReviewsRoute.get("/:id", GlobalReviewsController.getGlobalReviewById);
GlobalReviewsRoute.post("/",validate(addGlobalReviewSchema), GlobalReviewsController.addGlobalReview);

GlobalReviewsRoute.put("/:id",validate(updateGlobalReviewSchema),verifyAuth, GlobalReviewsController.updateGlobalReview);
GlobalReviewsRoute.delete("/:id",verifyAuth, GlobalReviewsController.deleteGlobalReview);