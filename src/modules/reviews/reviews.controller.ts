import { NextFunction, Request, Response } from "express";
import { ReviewsService } from "./reviews.service";

export const ReviewsController = {

    async getReviews(req:Request, res:Response,next:NextFunction) {

        try {
            const reviews = await ReviewsService.getReviews();
            res.status(200).send({
                success : true,
                message : "Reviews fetched successfully",
                data : reviews
            })
        } catch (error) {
            next(error);
        }
    },

    async getReviewsByMealId(req:Request,res:Response,next:NextFunction){

        try {
            const mealId = Number(req.params.mealId);
            const reviews = await ReviewsService.getReviewsByMealId(mealId);
            res.status(200).send({
                success : true,
                message : "Reviews fetched successfully",
                data : reviews
            });
        } catch (error) {
            next(error) ;
        }
    },

    async getReviewById(req:Request,res:Response,next:NextFunction){

        try {
            const id = Number(req.params.id);
            const review = await ReviewsService.getReviewById(id);
            res.status(200).send({
                success : true,
                message : "Review fetched successfully",
                data : review
            });
        } catch (error) {
            next(error) ;
        }
    },

    async addReview(req:Request,res:Response,next:NextFunction){

        try {
            const reviewData = req.body;
            const review = await ReviewsService.addReview(reviewData);
            res.status(201).send({
                success : true,
                message : "Review added successfully",
                data : review
            });
        } catch (error) {
            next(error);
        }
    },

    async updateReview(req:Request,res:Response,next:NextFunction){

        try {
            const id = Number(req.params.id);
            const reviewData = req.body;
            const updatedReview = await ReviewsService.updateReview(id, reviewData);
            res.status(200).send({
                success : true,
                message : "Review updated successfully",
                data : updatedReview
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteReview(req:Request,res:Response,next:NextFunction){ 

        try {
            const id = Number(req.params.id);
            const deletedReview = await ReviewsService.deleteReview(id);
            res.status(200).send({
                success : true,
                message : "Review deleted successfully",
                data : deletedReview
            });
        } catch (error) {
            next(error);
        }
    }
}