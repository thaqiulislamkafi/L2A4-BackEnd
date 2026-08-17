import { Router } from "express";
import { FAQController } from "./faq.controller";
import { validate } from "../../middlewares/validate";
import { addFAQSchema, updateFAQSchema } from "./faq.schema";

export const FAQRouter = Router();

FAQRouter.get("/",FAQController.getAllFAQs);
FAQRouter.get("/published",FAQController.getPublishedFAQs);
FAQRouter.get("/:id", FAQController.getFAQById);

FAQRouter.post("/",validate(addFAQSchema),FAQController.createFAQ);
FAQRouter.put("/:id",validate(updateFAQSchema),FAQController.updateFAQ);
FAQRouter.patch("/:id/toggle-status",FAQController.togglePublishStatus);
FAQRouter.delete("/:id",FAQController.deleteFAQ);