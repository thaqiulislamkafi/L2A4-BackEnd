import { Router } from "express";
import { FAQController } from "./faq.controller";
import { validate } from "../../middlewares/validate";
import { addFAQSchema, updateFAQSchema } from "./faq.schema";

export const FAQRoute = Router();

FAQRoute.get("/",FAQController.getAllFAQs);
FAQRoute.get("/published",FAQController.getPublishedFAQs);
FAQRoute.get("/:id", FAQController.getFAQById);

FAQRoute.post("/",validate(addFAQSchema),FAQController.createFAQ);
FAQRoute.put("/:id",validate(updateFAQSchema),FAQController.updateFAQ);
FAQRoute.patch("/:id/toggle-status",FAQController.togglePublishStatus);
FAQRoute.delete("/:id",FAQController.deleteFAQ);