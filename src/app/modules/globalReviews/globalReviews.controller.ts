import { NextFunction, Request, Response } from "express";
import { GlobalReviewsService } from "./globalReviews.service";
import { AuthRequest } from "../../types/AuthRequest.type";

export const GlobalReviewsController = {

    async getGlobalReviews(req: Request, res: Response, next: NextFunction) {

        try {

            const reviews = await GlobalReviewsService.getGlobalReviews(req.query);
            res.status(200).send({
                success: true,
                message: "Global reviews fetched successfully",
                ...reviews
            });

        } catch (error) {
            next(error);
        }
    },

    async getGlobalReviewsByUser(req: Request, res: Response, next: NextFunction) {

        try {

            const user_id = String(req.params.user_id);
            const reviews = await GlobalReviewsService.getGlobalReviewsByUser(user_id, req.query);

            res.status(200).send({
                success: true,
                message: "Global reviews of the user fetched successfully",
                ...reviews
            });

        } catch (error) {
            next(error);
        }
    },

    async getGlobalReviewById(req: Request, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const review = await GlobalReviewsService.getGlobalReviewById(id);

            res.status(200).send({
                success: true,
                message: "Global review fetched successfully",
                data: review
            });

        } catch (error) {
            next(error);
        }
    },

    async addGlobalReview(req: Request, res: Response, next: NextFunction) {

        try {

            const reviewData = req.body;
            const review = await GlobalReviewsService.addGlobalReview(reviewData);

            res.status(201).send({
                success: true,
                message: "Global review added successfully",
                data: review
            });

        } catch (error) {
            next(error);
        }
    },

    async updateGlobalReview(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const reviewData = req.body;

            if (!req.user) throw new Error("User not found");
            const updatedReview = await GlobalReviewsService.updateGlobalReview(id,reviewData,req.user);

            res.status(200).send({
                success: true,
                message: "Global review updated successfully",
                data: updatedReview
            });

        } catch (error) {
            next(error);
        }
    },

    async deleteGlobalReview(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);

            // if (!req.user) throw new Error("User not found");
            const deletedReview = await GlobalReviewsService.deleteGlobalReview(id,req.user);
            
            res.status(200).send({
                success: true,
                message: "Global review deleted successfully",
                data: deletedReview
            });

        } catch (error) {
            next(error);
        }
    }
};