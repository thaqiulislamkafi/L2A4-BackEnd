
import { Router } from "express";
import { DietryTypesController } from "./dietryType.controller";
import { validate } from "../../middlewares/validate";
import { addDietryTypeSchema, updateDietryTypeSchema } from "./dietryType.schema";

export const DietryTypeRoute = Router();

DietryTypeRoute.get('/', DietryTypesController.getDietryTypes) ;
DietryTypeRoute.get('/:id', DietryTypesController.getDietryTypeById) ;
DietryTypeRoute.post('/',validate(addDietryTypeSchema), DietryTypesController.addDietryType) ;
DietryTypeRoute.put('/:id',validate(updateDietryTypeSchema), DietryTypesController.updateDietryType) ;
DietryTypeRoute.delete('/:id', DietryTypesController.deleteDietryType) ;
