
import { Router } from "express";
import { MealController } from "./meals.controller";

export const MealRoute = Router();

MealRoute.get('/',MealController.getMeals) ;
MealRoute.get('/:id',MealController.getMealById) ;
MealRoute.post('/',MealController.addMeal) ;
MealRoute.put('/:id',MealController.updateMeal) ;
MealRoute.delete('/:id',MealController.deleteMeal) ;
