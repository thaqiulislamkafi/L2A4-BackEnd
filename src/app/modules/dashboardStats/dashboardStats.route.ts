import { Router } from "express";
import { DashboardStatsController } from "./dashboardStats.controller";

export const DashboardStatsRoute = Router();

DashboardStatsRoute.get("/", DashboardStatsController.getAllDashboardStats) ;
DashboardStatsRoute.get("/stats", DashboardStatsController.getDashboardStats) ;

DashboardStatsRoute.get("/yearly",DashboardStatsController.getYearlyStats) ;
DashboardStatsRoute.get("/monthly",DashboardStatsController.getMonthlyStats) ;
DashboardStatsRoute.get('/stats',DashboardStatsController.getDashboardStats) ;

DashboardStatsRoute.get("/month/:month",DashboardStatsController.getDashboardStatsByMonth) ;
DashboardStatsRoute.get("/:id",DashboardStatsController.getDashboardStatsById) ;
DashboardStatsRoute.put("/:id",DashboardStatsController.updateDashboardStats) ;