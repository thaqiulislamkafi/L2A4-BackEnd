import { DashboardService } from "./dashboard.service";
import { NextFunction, Request, Response } from "express";


export const DashboardController = {

    async AdminDashboard(req: Request, res: Response, next: NextFunction) {

        try {
            const result = await DashboardService.adminDashboard();
            res.status(200).send({
                success: true,
                message: "Admin Dashboard data retrieved successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    async ProviderDashboard(req: Request, res: Response, next: NextFunction) {

        try {
            const provider_id = String(req.params.provider_id);
            const result = await DashboardService.providerDashboard(provider_id);
            res.status(200).send({
                success: true,
                message: "Provider Dashboard data retrieved successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    async UserDashboard(req: Request, res: Response, next: NextFunction) {

        try {
            const user_id = String(req.params.user_id);
            const result = await DashboardService.userDashboard(user_id);
            res.status(200).send({
                success: true,
                message: "User Dashboard data retrieved successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}