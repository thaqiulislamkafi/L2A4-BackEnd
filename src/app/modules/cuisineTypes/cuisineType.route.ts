
import { Router } from "express";
import { CuisineTypeController } from "./cuisineType.controller";
import { validate } from "../../middlewares/validate";
import { addCuisineTypeSchema, updateCuisineTypeSchema } from "./cuisineType.schema";

export const CuisineTypeRoute = Router();

CuisineTypeRoute.get('/',CuisineTypeController.getCuisineTypes) ;
CuisineTypeRoute.get('/:id',CuisineTypeController.getCuisineTypeById) ;
CuisineTypeRoute.post('/',validate(addCuisineTypeSchema), CuisineTypeController.addCuisineType) ;
CuisineTypeRoute.put('/:id',validate(updateCuisineTypeSchema), CuisineTypeController.updateCuisineType) ;
CuisineTypeRoute.delete('/:id',CuisineTypeController.deleteCuisineType) ;
