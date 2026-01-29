
import { Router } from "express";
import { CategoriesController } from "./categories.controller";

export const CategoriesRoute = Router();

CategoriesRoute.get("/",CategoriesController.getAllCategories) ;
CategoriesRoute.get("/:id",CategoriesController.getCategoryById) ;
CategoriesRoute.post("/",CategoriesController.addCategory) ;
CategoriesRoute.put("/:id",CategoriesController.updateCategory) ;
CategoriesRoute.delete("/:id",CategoriesController.deleteCategory) ;