
import { Router } from "express";
import { MealController } from "./meals.controller";

export const MealRoute = Router();

MealRoute.get('/api/meals',MealController.getMeals) ;
MealRoute.get('/api/meals/:id',MealController.getMealById) ;
MealRoute.post('/api/meals',MealController.addMeal) ;
MealRoute.put('/api/meals/:id',MealController.updateMeal) ;
MealRoute.delete('/api/meals/:id',MealController.deleteMeal) ;
