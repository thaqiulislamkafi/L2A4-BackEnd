import { NextFunction, Request, Response } from "express";
import { MealService } from "./meals.service";
import { AuthRequest } from "../../types/AuthRequest.type";

export const MealController = {

    async getMeals(req: Request, res: Response, next: NextFunction) {

        try {

            const meals = await MealService.getMeals(req.query);
            res.status(200).send({
                success: true,
                message: "Meals fetched successfully",
                ...meals
            });

        } catch (error) {
            next(error);
        }
    },

    async getMealsById(req: Request, res: Response, next: NextFunction) {

        try {

            const id = String(req.params.id);
            const meals = await MealService.findMealById(id);

            res.status(200).send({
                success: true,
                message: "Meal fetched successfully",
                data: meals
            });

        } catch (error) {
            next(error);
        }
    },

    async getMealById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = String(req.params.id);
            const meal = await MealService.findMealById(id);
            res.status(200).send({
                success: true,
                message: "Meal fetched successfully",
                data: meal
            });
        } catch (error) {
            next(error);
        }
    },

    async getMealsByProvider(req: Request, res: Response, next: NextFunction) {

        try {
            const provider_id = String(req.params.provider_id);
            const meal = await MealService.getMealsByProvider(provider_id, req.query);

            res.status(200).send({
                success: true,
                message: "Providers Meal fetched successfully",
                data: meal
            });
        } catch (error) {
            next(error);
        }
    },

    async addMeal(req: Request, res: Response, next: NextFunction) {

        try {
            const mealData = req.body;
            const meal = await MealService.addMeal(mealData);

            res.status(201).send({
                success: true,
                message: "Meal added successfully",
                data: meal
            });
        } catch (error) {
            next(error);
        }
    },

    async uploadMealImage(req: Request, res: Response, next: NextFunction) {

        try {
            if (!req.file) {
                return res.status(400).send({
                    success: false,
                    message: "No file uploaded"
                });
            }

            res.status(200).send({
                success: true,
                message: "Meal image uploaded successfully",
                data: {
                    imageUrl: req.file.path,
                    publicId: req.file.filename
                }
            });

        } catch (error) {
            next(error);
        }
    },

    async updateMeal(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const id = String(req.params.id);
            const mealData = req.body;

            if (!req.user) throw new Error('User not found')

            const updatedMeal = await MealService.updateMeal(id, mealData, req.user);

            res.status(200).send({
                success: true,
                message: "Meal updated successfully",
                data: updatedMeal
            });

        } catch (error) {
            next(error);
        }
    },

    async deleteMeal(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const id = String(req.params.id);

            if (!req.user) throw new Error('User not found')
            const deletedMeal = await MealService.deleteMeal(id, req.user);

            res.status(200).send({
                success: true,
                message: "Meal deleted successfully",
                data: deletedMeal
            });
        } catch (error) {
            next(error);
        }
    },

    async markMealHeroContent(req: Request, res: Response, next: NextFunction) {

        try {

            const mealId = String(req.params.id);
            const result = await MealService.markMealHeroContent(mealId);

            res.status(200).send({
                success: true,
                message: "Meal marked as hero content successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },


    async unMarkMealHeroContent(req: Request, res: Response, next: NextFunction) {

        try {

            const mealId = String(req.params.id);
            const result = await MealService.unMarkMealHeroContent(mealId);

            res.status(200).send({
                success: true,
                message: "Meal unmarked as hero content successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },


    async getMealHeroContent(req: Request, res: Response, next: NextFunction) {

        try {

            const result = await MealService.getMealHeroContent();
            res.status(200).send({
                success: true,
                message: "Hero meal fetched successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }
    },

    async getPublishedMeals(req: Request,res: Response,next: NextFunction) {

        try {

            const meals = await MealService.getPublishedMeals(req.query);
            res.status(200).send({
                success: true,
                message: "Published meals fetched successfully",
                ...meals
            });

        } catch (error) {
            next(error);
        }
    },


    async manageMealSliderContent(req: Request,res: Response,next: NextFunction) {
        
        try {

            const mealId = String(req.params.id);
            const isSliderContent = req.body.isSliderContent;

            const meal = await MealService.manageMealSliderContent(mealId,isSliderContent);

            res.status(200).send({
                success: true,
                message: isSliderContent? "Meal added to slider content successfully": "Meal removed from slider content successfully",
                data: meal
            });

        } catch (error) {
            next(error);
        }
    },


    async getMealSliderContents(req: Request,res: Response,next: NextFunction) {

        try {

            const meals = await MealService.getMealSliderContents();
            res.status(200).send({
                success: true,
                message: "Meal slider contents fetched successfully",
                data: meals
            });

        } catch (error) {
            next(error);
        }
    },


    async manageMealPublish(req: Request,res: Response,next: NextFunction) {

        try {

            const mealId = String(req.params.id);
            const isPublished = req.body.isPublished;
            const meal = await MealService.manageMealPublish(mealId,isPublished);

            res.status(200).send({
                success: true,
                message: isPublished ? "Meal published successfully" : "Meal unpublished successfully",
                data: meal
            });

        } catch (error) {
            next(error);
        }
    },
}