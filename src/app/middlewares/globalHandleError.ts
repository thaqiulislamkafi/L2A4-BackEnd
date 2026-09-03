/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";


export const GlobalHandleError = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode: number = 500;
    let errorMessage: string = 'Internal Server Error';
    const errorDetails = err;

    if ((err) instanceof Prisma.PrismaClientKnownRequestError) {

        if (err.code === 'P2025') {
            errorMessage = "Record Not Found"
        }

        else if (err.code === 'P2003') {
            errorMessage = `Foreign key constraint Failed `
        }

        else if (err.code === 'P2002') {
            errorMessage = `Unique constraint failed on the constraint`
        }
    }

    else if ((err) instanceof Prisma.PrismaClientValidationError) {
        errorMessage = "Field doesn't match"

    }

    else if (err instanceof Error) {
        statusCode = 404;
        errorMessage = err.message;
    }

    console.log(err)
    res.status(statusCode).send({
        success: false,
        errorCode: err.code,
        message: errorMessage,
        error: errorDetails
    })
}