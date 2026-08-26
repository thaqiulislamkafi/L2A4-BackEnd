import { DashboardController } from "./dashboard.controller";
import { Router } from "express";

export const DashboardRoute = Router();

DashboardRoute.get('/admin', DashboardController.AdminDashboard) ;
DashboardRoute.get('/provider/:provider_id', DashboardController.ProviderDashboard) ;
DashboardRoute.get('/user/:user_id',DashboardController.UserDashboard) ;