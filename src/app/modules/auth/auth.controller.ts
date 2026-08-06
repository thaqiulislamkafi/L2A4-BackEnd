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
    },

    async RequestPasswordReset(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.RequestPasswordReset(req.body.email);

            res.status(200).json({
                success: true,
                message: 'Password reset request successful',
                data: result.message,
            });
        } catch (error) {
            next(error)
        }
    },

    async ResetPassword(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.ResetPassword(req.body);
            res.status(200).json({
                success: true,
                message: 'Password reset successful',
                data: result.status
            });

        } catch (error) {
            next(error)
        }

    },

    async forgotPasswordByOTP(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email } = req.body;
            const result = await AuthService.forgotPasswordByOTP(email);

            res.status(200).json({
                success: true,
                message: 'OTP send Succeefully to email',
                data: result.success
            });

        } catch (error) {
            next(error)
        }
    },

    async verifyOTP(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email, otp } = req.body;
            const result = await AuthService.verifyOtp(email, otp);

            res.status(200).json({
                success: true,
                message: 'OTP verified Successfully',
                data: result.success
            });

        } catch (error) {
            next(error)
        }
    },

    async resetPasswordByOTP(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email, otp, newPassword } = req.body;
            const result = await AuthService.resetPasswordByOTP(email, otp, newPassword);

            res.status(200).json({
                success: true,
                message: 'Password reset by OTP Successfully',
                data: result.success
            });

        } catch (error) {
            next(error)
        }
    }

};