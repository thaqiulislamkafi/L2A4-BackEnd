
import { Router } from "express";
import { DietryTypesController } from "./dietryType.controller";

export const DietryTypeRoute = Router();

DietryTypeRoute.get('/api/dietry-types', DietryTypesController.getDietryTypes) ;
DietryTypeRoute.get('/api/dietry-types/:id', DietryTypesController.getDietryTypeById) ;
DietryTypeRoute.post('/api/dietry-types', DietryTypesController.addDietryType) ;
DietryTypeRoute.put('/api/dietry-types/:id', DietryTypesController.updateDietryType) ;
DietryTypeRoute.delete('/api/dietry-types/:id', DietryTypesController.deleteDietryType) ;
