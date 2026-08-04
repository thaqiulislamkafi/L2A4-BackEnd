import { DashboardController } from "./dashboard.controller";
import { Router } from "express";

export const DashboardRouter = Router();

DashboardRouter.get('/admin', DashboardController.AdminDashboard) ;
DashboardRouter.get('/provider/:provider_id', DashboardController.ProviderDashboard) ;
DashboardRouter.get('/user/:user_id',DashboardController.UserDashboard) ;