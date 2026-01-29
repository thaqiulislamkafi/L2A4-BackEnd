import { NextFunction, Request, Response } from "express";
import { DietryTypesService } from "./dietryTypes.service";


export const DietryTypesController = {

    async getDietryTypes(req:Request, res:Response,next:NextFunction) {

        try {
            
            const dietryTypes = await DietryTypesService.getDietryTypes();
            res.status(200).send({
                success : true,
                message : "Dietry Types fetched successfully",
                data : dietryTypes
            });

        } catch (error) {
            next(error);
        }
    },

    async getDietryTypeById(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const dietryType = await DietryTypesService.getDietryTypeById(id);
            res.status(200).send({
                success : true,
                message : "Dietry Type fetched successfully",
                data : dietryType
            });
        } catch (error) {
            next(error);
        }
    },

    async addDietryType(req:Request, res:Response,next:NextFunction) {

        try {
            const { name } = req.body;
            const dietryType = await DietryTypesService.addDietryType(name);
            res.status(201).send({
                success : true,
                message : "Dietry Type added successfully",
                data : dietryType
            });
        } catch (error) {
            next(error);
        }
    },

    async updateDietryType(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const { name } = req.body;
            const dietryType = await DietryTypesService.updateDietryType(id, name);
            res.status(200).send({
                success : true,
                message : "Dietry Type updated successfully",
                data : dietryType
            });
        } catch (error) {
           next(error);
        }
    },

    async deleteDietryType(req:Request, res:Response,next:NextFunction) {

        try {
            const id = Number(req.params.id);
            const dietryType = await DietryTypesService.deleteDietryType(id);
            res.status(200).send({
                success : true,
                message : "Dietry Type deleted successfully",
                data : dietryType
            });
        } catch (error) {
            next(error);
        }
    },
}