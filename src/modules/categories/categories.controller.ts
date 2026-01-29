import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "./categories.service";

export const CategoriesController = {

    async getAllCategories(req: Request, res: Response, next: NextFunction) {

        try {

            const categories = await CategoriesService.getAllCategories();
            res.status(200).send({
                success: true,
                message: "Categories fetched successfully",
                data: categories
            });
        } catch (error) {
            next(error);
        }
    },

    async getCategoryById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = Number(req.params.id);
            const category = await CategoriesService.getCategoryById(id);
            res.status(200).send({
                success: true,
                message: "Category fetched successfully",
                data: category
            });
        } catch (error) {
            next(error);
        }
    },

    async addCategory(req: Request, res: Response, next: NextFunction) {    

        try {
            const data = req.body;
            const category = await CategoriesService.addCategory(data);
            res.status(201).send({
                success: true,
                message: "Category added successfully",
                data: category
            });
        } catch (error) {
            next(error);
        }
    },

    async updateCategory(req: Request, res: Response, next: NextFunction) {

        try {
            const id = Number(req.params.id);
            const data = req.body;
            const category = await CategoriesService.updateCategory(id, data);
            res.status(200).send({
                success: true,
                message: "Category updated successfully",
                data: category
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCategory(req: Request, res: Response, next: NextFunction) {

        try {
            const id = Number(req.params.id);
            const category = await CategoriesService.deleteCategory(id);
            res.status(200).send({
                success: true,
                message: "Category deleted successfully",
                data: category
            });
        } catch (error) {
            next(error);
        }
    }
}