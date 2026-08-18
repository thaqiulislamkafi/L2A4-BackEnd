import { Router } from "express";
import { DashboardStatsController } from "./dashboardStats.controller";

export const DashboardStatsRouter = Router();

DashboardStatsRouter.get("/", DashboardStatsController.getAllDashboardStats) ;
DashboardStatsRouter.get("/yearly",DashboardStatsController.getYearlyStats) ;
DashboardStatsRouter.get("/monthly",DashboardStatsController.getMonthlyStats) ;
DashboardStatsRouter.get('/stats',DashboardStatsController.getDashboardStats) ;

DashboardStatsRouter.get("/month/:month",DashboardStatsController.getDashboardStatsByMonth) ;
DashboardStatsRouter.get("/:id",DashboardStatsController.getDashboardStatsById) ;
DashboardStatsRouter.put("/:id",DashboardStatsController.updateDashboardStats) ;