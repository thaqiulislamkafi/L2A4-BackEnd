import { NextFunction, Request, Response } from "express";
import { DashboardStatsService } from "./dashboardStats.service";


export const DashboardStatsController = {

    async getAllDashboardStats(req: Request, res: Response, next: NextFunction) {

        try {

            const result = await DashboardStatsService.getAllDashboardStats();
            res.status(200).send({
                success: true,
                message: "Dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async getDashboardStatsById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id;
            const result = await DashboardStatsService.getDashboardStatsById(String(id));

            res.status(200).send({
                success: true,
                message: "Dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async getDashboardStats(req: Request, res: Response, next: NextFunction) {

        try {

            const result = await DashboardStatsService.getDashboardStats();
            res.status(200).send({
                success: true,
                message: "Dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async getDashboardStatsByMonth(req: Request, res: Response, next: NextFunction) {

        try {
            const month = Number(req.params.month);
            const result = await DashboardStatsService.getDashboardStatsByMonth(month);

            res.status(200).send({
                success: true,
                message: "Monthly dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async getYearlyStats(req: Request, res: Response, next: NextFunction) {

        try {
            const year = Number(req.query.year);

            const result = await DashboardStatsService.getYearlyStats(year);

            res.status(200).send({
                success: true,
                message: "Yearly dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async getMonthlyStats(req: Request, res: Response, next: NextFunction) {

        try {
            const year = Number(req.query.year);
            const month = Number(req.query.month);
            const result = await DashboardStatsService.getMonthlyStats(year, month);

            res.status(200).send({
                success: true,
                message: "Monthly dashboard statistics retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    async updateDashboardStats(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id;
            const result = await DashboardStatsService.updateDashboardStats(String(id), req.body);

            res.status(200).send({
                success: true,
                message: "Dashboard statistics updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
};