
import { Router } from "express";
import { MealController } from "./meals.controller";
import { validate } from "../../middlewares/validate";
import { addMealSchema, updateMealSchema } from "./meals.schema";
import { mealUpload } from "../../../config/multerCloudinary";

export const MealRoute = Router();

MealRoute.get('/',MealController.getMeals) ;
MealRoute.get('/:id',MealController.getMealById) ;
MealRoute.get('/provider/:provider_id',MealController.getMealsByProvider)

MealRoute.post('/',validate(addMealSchema),MealController.addMeal) ;
MealRoute.post('/image-upload',mealUpload.single('file'),MealController.uploadMealImage);
MealRoute.put('/:id',validate(updateMealSchema),MealController.updateMeal) ;
MealRoute.delete('/:id',MealController.deleteMeal) ;
