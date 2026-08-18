
import { Request, Response, NextFunction } from "express";
import { MealAnalyticsService } from "./mealAnalytics.service";

export const MealAnalyticsController = {

    async getMealAnalyticsByMealId(req: Request,res: Response,next: NextFunction) {

        try {
            const mealId = req.params.mealId;
            const result = await MealAnalyticsService.getMealAnalyticsData( String(mealId));

            res.status(200).send({
                success: true,
                message: "Meal analytics retrieved successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },

    async addMealAnalyticsData( req: Request, res: Response, next: NextFunction) {

        try {

            const { mealId, providerId } = req.body;
            const result = await MealAnalyticsService.addMealAnalyticsData(String(mealId),String(providerId));

            res.status(201).send({
                success: true,
                message: "Meal analytics created successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },

    async incrementReviewAnalyticsData(req: Request,res: Response,next: NextFunction
    ) {
        try {

            const mealId = req.params.mealId;
            await MealAnalyticsService.incrementReviewAnalyticsData(String(mealId));

            res.status(200).send({
                success: true,
                message: "Review analytics incremented successfully"
            });

        } catch (error) {
            next(error);
        }
    },

    async decrementReviewAnalyticsData(req: Request,res: Response,next: NextFunction) {

        try {

            const mealId = req.params.mealId;
            await MealAnalyticsService.decrementReviewAnalyticsData(String(mealId));

            res.status(200).send({
                success: true,
                message: "Review analytics decremented successfully"
            });

        } catch (error) {
            next(error);
        }
    },

    async incrementOrderAnalyticsData(req: Request,res: Response,next: NextFunction) {

        try {
            const mealId = req.params.mealId;

            await MealAnalyticsService.incrementOrderAnalyticsData(String(mealId));

            res.status(200).send({
                success: true,
                message: "Order analytics incremented successfully"
            });

        } catch (error) {
            next(error);
        }
    },

    async decrementOrderAnalyticsData(req: Request,res: Response,next: NextFunction) {

        try {
            const mealId = req.params.mealId;
            await MealAnalyticsService.decrementOrderAnalyticsData(String(mealId));
            
            res.status(200).send({
                success: true,
                message: "Order analytics decremented successfully"
            });

        } catch (error) {
            next(error);
        }
    }
};

