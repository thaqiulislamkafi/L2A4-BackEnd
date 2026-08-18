
import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { validate } from "../../middlewares/validate";
import { addCategorySchema, updateCategorySchema } from "./categories.schema";

export const CategoriesRoute = Router();

CategoriesRoute.get("/",CategoriesController.getAllCategories) ;
CategoriesRoute.get("/:id",CategoriesController.getCategoryById) ;
CategoriesRoute.post("/",validate(addCategorySchema), CategoriesController.addCategory) ;
CategoriesRoute.put("/:id",validate(updateCategorySchema), CategoriesController.updateCategory) ;
CategoriesRoute.delete("/:id",CategoriesController.deleteCategory) ;