import { NextFunction, Request, Response } from "express";
import { FAQService } from "./faq.service";

export const FAQController = {
  
  async getAllFAQs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FAQService.getAllFAQs(req.query);

      res.status(200).send({
        success: true,
        message: "FAQs retrieved successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getPublishedFAQs( req: Request, res: Response, next: NextFunction) {

    try {
      const result = await FAQService.getPublishedFAQs(req.query);
      res.status(200).send({
        success: true,
        message: "Published FAQs retrieved successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getFAQById( req: Request, res: Response, next: NextFunction) {

    try {

      const id = String(req.params.id);
      const result = await FAQService.getFAQById(id);
      res.status(200).send({
        success: true,
        message: "FAQ retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async createFAQ( req: Request, res: Response, next: NextFunction) {

    try {

      const result = await FAQService.createFAQ(req.body);
      res.status(201).send({
        success: true,
        message: "FAQ created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateFAQ( req: Request, res: Response, next: NextFunction) {

    try {

      const id = String(req.params.id);
      const result = await FAQService.updateFAQ( id, req.body);

      res.status(200).send({
        success: true,
        message: "FAQ updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async togglePublishStatus( req: Request, res: Response, next: NextFunction) {

    try {

      const id = String(req.params.id);
      const result = await FAQService.togglePublishStatus(id);
      res.status(200).send({
        success: true,
        message: "FAQ status updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteFAQ( req: Request, res: Response, next: NextFunction) {

    try {

      const id = String(req.params.id);
      const result = await FAQService.deleteFAQ(id);
      res.status(200).send({
        success: true,
        message: "FAQ deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};