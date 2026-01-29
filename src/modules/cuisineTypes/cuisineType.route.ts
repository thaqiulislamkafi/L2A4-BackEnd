
import { Router } from "express";
import { CuisineTypeController } from "./cuisineType.controller";

export const CuisineTypeRoute = Router();

CuisineTypeRoute.get('/api/cuisine-types',CuisineTypeController.getCuisineTypes) ;
CuisineTypeRoute.get('/api/cuisine-types/:id',CuisineTypeController.getCuisineTypeById) ;
CuisineTypeRoute.post('/api/cuisine-types',CuisineTypeController.addCuisineType) ;
CuisineTypeRoute.put('/api/cuisine-types/:id',CuisineTypeController.updateCuisineType) ;
CuisineTypeRoute.delete('/api/cuisine-types/:id',CuisineTypeController.deleteCuisineType) ;
