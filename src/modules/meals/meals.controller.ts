import { Request, Response } from "express";
import { MealService } from "./meals.service";

export const MealController = {

    async getMeals(req:Request,res:Response){

        try {
            
            const meals = await MealService.getMeals();
            res.status(200).send({
                success : true,
                message : "Meals fetched successfully",
                data : meals
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({message : "Internal Server Error"})
        }
    },

    async getMealById(req:Request,res:Response){

        try {
            const id = Number(req.params.id);
            const meal = await MealService.findMealById(id);
            res.status(200).send({
                success : true,
                message : "Meal fetched successfully",
                data : meal
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({message : "Internal Server Error"})
        }
    },

    async addMeal(req:Request,res:Response){

        try {
            const mealData = req.body;
            const meal = await MealService.addMeal(mealData);
            res.status(201).send({
                success : true,
                message : "Meal added successfully",
                data : meal
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({message : "Internal Server Error"})
        }
    },

    async updateMeal(req:Request,res:Response){

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
            console.error(error);
            res.status(500).send({message : "Internal Server Error"})
        }
    },

    async deleteMeal(req:Request,res:Response){

        try {
            const id = Number(req.params.id);
            const deletedMeal = await MealService.deleteMeal(id);
            res.status(200).send({
                success : true,
                message : "Meal deleted successfully",
                data : deletedMeal
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({message : "Internal Server Error"})
        }
    }
}