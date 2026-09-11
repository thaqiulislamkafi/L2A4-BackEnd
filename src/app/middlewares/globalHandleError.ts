/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import { handlePrismaError } from "../utils/prismaErrorHandler";


export const GlobalHandleError = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode: number = 500;
    let errorMessage: string = 'Internal Server Error';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = handlePrismaError(err);

        statusCode = prismaError.statusCode;
        errorMessage = prismaError.message;
    }

    else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Invalid data provided.";
    }

    else if (err instanceof Error) {
        statusCode = 404;
        errorMessage = err.message;
    }

    res.status(statusCode).send({
        success: false,
        errorCode: err.code,
        message: errorMessage,
    })
}