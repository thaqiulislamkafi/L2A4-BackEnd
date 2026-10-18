/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

const MAX_RESPONSE_SIZE = 1 * 1024 * 1024; // 1 MB

export const responseSizeLimit = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const originalJson = res.json.bind(res);

    res.json = ((body: any) => {
        const responseBody = JSON.stringify(body);
        const size = Buffer.byteLength(responseBody, "utf8");

        if (size > MAX_RESPONSE_SIZE) {
            return res.status(500).send({
                success: false,
                message: "Response payload is too large"
            });
        }

        return originalJson(body);
    }) as Response["json"];

    next();
};