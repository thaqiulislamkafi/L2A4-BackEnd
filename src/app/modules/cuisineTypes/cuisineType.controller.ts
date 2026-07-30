import { NextFunction, Request, Response } from "express";
import { CuisineTypeService } from "./cuisineTypes.service";

export const CuisineTypeController = {

    async getCuisineTypes(req:Request, res:Response,next:NextFunction) {

        try {
            
            const cuisineTypes = await CuisineTypeService.getCuisineTypes();
            res.status(200).send({
                success : true,
                message : "Cuisine Types fetched successfully",
                data : cuisineTypes
            });

        } catch (error) {
            next(error);
        }

    },

    async getCuisineTypeById(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const cuisineType = await CuisineTypeService.getCuisineTypeById(id);
            res.status(200).send({
                success : true,
                message : "Cuisine Type fetched successfully",
                data : cuisineType
            });
        } catch (error) {
            next(error);

        }
    },

    async addCuisineType(req:Request, res:Response,next:NextFunction) {

        try {
            const  name  = req.body;
            const cuisineType = await CuisineTypeService.addCuisineType(name);
            res.status(201).send({
                success : true,
                message : "Cuisine Type added successfully",
                data : cuisineType
            });
        } catch (error) {
            next(error);
        }
    },


    async updateCuisineType(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const  name = req.body;
            const updatedCuisineType = await CuisineTypeService.updateCuisineType(id, name);
            res.status(200).send({
                success : true,
                message : "Cuisine Type updated successfully",
                data : updatedCuisineType
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteCuisineType(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const deletedCuisineType = await CuisineTypeService.deleteCuisineType(id);
            res.status(200).send({
                success : true,
                message : "Cuisine Type deleted successfully",
                data : deletedCuisineType
            });
        } catch (error) {
            next(error);
        }
    },
}