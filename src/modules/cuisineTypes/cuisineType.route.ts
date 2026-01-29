
import { Router } from "express";
import { CuisineTypeController } from "./cuisineType.controller";

export const CuisineTypeRoute = Router();

CuisineTypeRoute.get('/',CuisineTypeController.getCuisineTypes) ;
CuisineTypeRoute.get('/:id',CuisineTypeController.getCuisineTypeById) ;
CuisineTypeRoute.post('/',CuisineTypeController.addCuisineType) ;
CuisineTypeRoute.put('/:id',CuisineTypeController.updateCuisineType) ;
CuisineTypeRoute.delete('/:id',CuisineTypeController.deleteCuisineType) ;
