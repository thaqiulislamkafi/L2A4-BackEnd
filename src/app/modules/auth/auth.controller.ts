import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types/AuthRequest.type";
import { appendCookies } from "../../utils/appendCookies";
import { AuthService } from "./auth.service";

export const AuthController = {

    async SignUp(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.SignUp(req.body, req);
            appendCookies(res, result.headers);

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                data: result.response.user,
            });
        } catch (error) {
            next(error)
        }
    },

    async SignIn(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.SignIn(req.body, req);
            appendCookies(res, result.headers);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result.response.user,
            });
        } catch (error) {
            next(error)
        }
    },

    async SignOut(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.SignOut(req);
            appendCookies(res, result.headers);

            res.status(200).json({
                success: true,
                message: 'Logout successful',
            });
        } catch (error) {
            next(error)
        }
    }

};