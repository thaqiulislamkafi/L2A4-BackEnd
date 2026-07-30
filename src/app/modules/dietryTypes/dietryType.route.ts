
import { Router } from "express";
import { DietryTypesController } from "./dietryType.controller";

export const DietryTypeRoute = Router();

DietryTypeRoute.get('/', DietryTypesController.getDietryTypes) ;
DietryTypeRoute.get('/:id', DietryTypesController.getDietryTypeById) ;
DietryTypeRoute.post('/', DietryTypesController.addDietryType) ;
DietryTypeRoute.put('/:id', DietryTypesController.updateDietryType) ;
DietryTypeRoute.delete('/:id', DietryTypesController.deleteDietryType) ;
