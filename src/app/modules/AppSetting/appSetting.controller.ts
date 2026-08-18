import { NextFunction, Request, Response } from "express";
import { AppSettingService } from "./appSetting.service";
import { SettingType } from "../../../generated/prisma/enums";

export const AppSettingController = {

    async getAllSettings(req: Request, res: Response, next: NextFunction) {

        try {

            const result = await AppSettingService.getAllSettings();

            res.status(200).send({
                success: true,
                message: "Settings retrieved successfully",
                data : result
            });

        } catch (error) {
            next(error);
        }

    },

    async getSettingById(req: Request, res: Response, next: NextFunction) {

        try {

            const id = req.params.id;
            const result = await AppSettingService.getSettingById(String(id));

            res.status(200).send({
                success: true,
                message: "Setting retrieved successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

    async getSettingByKey(req: Request, res: Response, next: NextFunction) {

        try {

            const key = req.params.key;
            const result = await AppSettingService.getSettingByKey(String(key));

            res.status(200).send({
                success: true,
                message: "Setting retrieved successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

    async getSettingsByType(req: Request, res: Response, next: NextFunction) {

        try {

            const type = req.params.type;
            const result = await AppSettingService.getSettingsByType(type as SettingType);

            res.status(200).send({
                success: true,
                message: "Settings retrieved successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

    async addSetting(req: Request, res: Response, next: NextFunction) {

        try {

            const result = await AppSettingService.addSetting(req.body);
            res.status(201).send({
                success: true,
                message: "Setting added successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

    async updateSetting(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id;
            const result = await AppSettingService.updateSetting(String(id),req.body);

            res.status(200).send({
                success: true,
                message: "Setting updated successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

    async deleteSetting(req: Request, res: Response, next: NextFunction) {

        try {

            const id = req.params.id;
            const result = await AppSettingService.deleteSetting(String(id));
            res.status(200).send({
                success: true,
                message: "Setting deleted successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    },

};