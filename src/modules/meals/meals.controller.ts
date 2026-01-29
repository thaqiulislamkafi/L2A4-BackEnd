import { NextFunction, Request, Response } from "express";
import { MealService } from "./meals.service";

export const MealController = {

    async getMeals(req:Request,res:Response,next:NextFunction) {

        try {
            
            const meals = await MealService.getMeals();
            res.status(200).send({
                success : true,
                message : "Meals fetched successfully",
                data : meals
            });

        } catch (error) {
            next(error);
        }
    },

    async getMealById(req:Request,res:Response,next:NextFunction){

        try {
            const id = Number(req.params.id);
            const meal = await MealService.findMealById(id);
            res.status(200).send({
                success : true,
                message : "Meal fetched successfully",
                data : meal
            });
        } catch (error) {
            next(error) ;
        }
    },

    async addMeal(req:Request,res:Response,next:NextFunction){

        try {
            const mealData = req.body;
            const meal = await MealService.addMeal(mealData);
            res.status(201).send({
                success : true,
                message : "Meal added successfully",
                data : meal
            });
        } catch (error) {
            next(error);
        }
    },

    async updateMeal(req:Request,res:Response,next:NextFunction){

        try {
            const id = Number(req.params.id);
            const mealData = req.body;
            const updatedMeal = await MealService.updateMeal(id, mealData);
            res.status(200).send({
                success : true,
                message : "Meal updated successfully",
                data : updatedMeal
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteMeal(req:Request,res:Response,next:NextFunction){

        try {
            const id = Number(req.params.id);
            const deletedMeal = await MealService.deleteMeal(id);
            res.status(200).send({
                success : true,
                message : "Meal deleted successfully",
                data : deletedMeal
            });
        } catch (error) {
            next(error);
        }
    }
}