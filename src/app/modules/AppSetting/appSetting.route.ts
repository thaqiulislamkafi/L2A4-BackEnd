import { Router } from "express";
import { AppSettingController } from "./appSetting.controller";
import { validate } from "../../middlewares/validate";
import { addAppSettingSchema, updateAppSettingSchema } from "./appSetting.schema";

export const AppSettingRouter = Router();

AppSettingRouter.get("/", AppSettingController.getAllSettings);
AppSettingRouter.get("/key/:key", AppSettingController.getSettingByKey);
AppSettingRouter.get("/type/:type", AppSettingController.getSettingsByType);
AppSettingRouter.get("/:id", AppSettingController.getSettingById);

AppSettingRouter.post("/",validate(addAppSettingSchema),AppSettingController.addSetting);
AppSettingRouter.put("/:id",validate(updateAppSettingSchema),AppSettingController.updateSetting);
AppSettingRouter.delete("/:id",AppSettingController.deleteSetting);