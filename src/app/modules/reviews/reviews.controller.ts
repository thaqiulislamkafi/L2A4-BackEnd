import { NextFunction, Request, Response } from "express";
import { ReviewsService } from "./reviews.service";
import { AuthRequest } from "../../types/AuthRequest.type";
import { MealAnalyticsService } from "../mealAnalytics/mealAnalytics.service";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";
import { getMonthAndDate } from "../../utils/getMonthAndDate";

export const ReviewsController = {

    async getReviews(req: Request, res: Response, next: NextFunction) {

        try {
            const reviews = await ReviewsService.getReviews(req.query);
            res.status(200).send({
                success: true,
                message: "Reviews fetched successfully",
                ...reviews
            })
        } catch (error) {
            next(error);
        }
    },

    async getReviewsByMealId(req: Request, res: Response, next: NextFunction) {

        try {
            const mealId = String(req.params.mealId);
            const reviews = await ReviewsService.getReviewsByMealId(mealId, req.query);
            res.status(200).send({
                success: true,
                message: "Reviews of Meal fetched successfully",
                ...reviews
            });
        } catch (error) {
            next(error);
        }
    },

    async getReviewsByUser(req: Request, res: Response, next: NextFunction) {

        try {

            const user_id = String(req.params.user_id);
            const reviews = await ReviewsService.getReviewsByUser(user_id,req.query);
            res.status(200).send({
                success: true,
                message: "Reviews of the User fetched successfully",
                ...reviews
            });
        } catch (error) {
            next(error);
        }
    },

    async getReviewById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = String(req.params.id);
            const review = await ReviewsService.getReviewById(id);
            res.status(200).send({
                success: true,
                message: "Review fetched successfully",
                data: review
            });
        } catch (error) {
            next(error);
        }
    },

    async addReview(req: Request, res: Response, next: NextFunction) {

        try {
            const reviewData = req.body;
            const review = await ReviewsService.addReview(reviewData) ;
            await MealAnalyticsService.incrementReviewAnalyticsData(review.meal_id) ;

            const date = await getMonthAndDate(String(review.createdAt));
            await DashboardStatsService.incrementMealsCreated(date.year,date.month) ;

            res.status(201).send({
                success: true,
                message: "Review added successfully",
                data: review
            });
        } catch (error) {
            next(error);
        }
    },

    async updateReview(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const reviewData = req.body;

            if (!req.user) throw new Error('User not found');

            const updatedReview = await ReviewsService.updateReview(id, reviewData, req.user);
            res.status(200).send({
                success: true,
                message: "Review updated successfully",
                data: updatedReview
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteReview(req: AuthRequest, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            if (!req.user) throw new Error('User not found');

            const deletedReview = await ReviewsService.deleteReview(id, req.user) ;
            await MealAnalyticsService.decrementReviewAnalyticsData(deletedReview.meal_id) ;

            const date = await getMonthAndDate(String(deletedReview.createdAt)) ;
            await DashboardStatsService.decrementReviewsCreated(date.year,date.month) ;

            res.status(200).send({
                success: true,
                message: "Review deleted successfully",
                data: deletedReview
            });
        } catch (error) {
            next(error);
        }
    }
}