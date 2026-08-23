
import { Router } from "express";
import { MealController } from "./meals.controller";
import { validate } from "../../middlewares/validate";
import { addMealSchema, updateMealSchema } from "./meals.schema";
import { mealUpload } from "../../../config/multerCloudinary";
import { verifyAuth } from "../../middlewares/verifyAuth";

export const MealRoute = Router();

MealRoute.get('/',MealController.getMeals) ;
MealRoute.get("/hero-content",MealController.getMealHeroContent);
MealRoute.get("/published",MealController.getPublishedMeals);
MealRoute.get('/:id',MealController.getMealById) ;

MealRoute.get('/provider/:provider_id',MealController.getMealsByProvider) ;
MealRoute.get("/slider-content",MealController.getMealSliderContents);

MealRoute.post('/',validate(addMealSchema),MealController.addMeal) ;
MealRoute.post('/image-upload',mealUpload.single('file'),MealController.uploadMealImage);
MealRoute.put('/:id',validate(updateMealSchema),verifyAuth,MealController.updateMeal) ;
MealRoute.delete('/:id',verifyAuth,MealController.deleteMeal) ;

MealRoute.put("/mark/hero-content/:id",MealController.markMealHeroContent);
MealRoute.put("/unmark/hero-content/:id",MealController.unMarkMealHeroContent);

MealRoute.put("/slider-content/:id",MealController.manageMealSliderContent);
MealRoute.put("/publish/:id",MealController.manageMealPublish);