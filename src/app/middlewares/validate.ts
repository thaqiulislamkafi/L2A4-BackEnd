import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validate = (schema:z.ZodObject) => {

    return (req:Request,res : Response, next:NextFunction) =>{

        const validateResult = schema.safeParse(req.body) ;

        if(!validateResult.success)
            next(validateResult.error) ;

        req.body = validateResult.data ;
        next() ;
    }
}