import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../types/AuthRequest.type";
import { appendCookies } from "../../utils/appendCookies";
import { AuthService } from "./auth.service";


export const AuthController = {

    async getAllUsers(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.getAllUsers(req.query);

            res.status(200).json({
                success: true,
                message: 'Users data is successfully retreived',
                ...result,
            });
        } catch (error) {
            next(error)
        }
    },

    async getUserById(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const userId = req.params.id
            const result = await AuthService.getUserById(String(userId));

            res.status(200).json({
                success: true,
                message: 'User data is successfully retreived',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    },

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

    async uploadUserImage(req: Request, res: Response, next: NextFunction) {

        try {
            if (!req.file) {
                return res.status(400).send({
                    success: false,
                    message: "No file uploaded"
                });
            }

            res.status(200).send({
                success: true,
                message: "User image uploaded successfully",
                data: {
                    imageUrl: req.file.path,
                    publicId: req.file.filename
                }
            });

        } catch (error) {
            next(error);
        }
    },

    async GetMe(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.GetMe(req);

            res.status(200).json({
                success: true,
                message: 'User and session get successfull',
                data: result,
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

    async changePassword(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.changePassword(req.body, req);
            res.status(200).json({
                success: true,
                message: 'Password changed successfully',
                data: result.user,
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

    async verifyOtpForForgetPassword(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email, otp } = req.body;
            const result = await AuthService.verifyOtpForForgetPassword(email, otp);

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
    },

    async sendOtpForEmailVerification(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email } = req.body;
            const result = await AuthService.sendOtpForEmailVerification(email);

            res.status(200).json({
                success: true,
                message: 'OTP is send for email verifiction successfully',
                data: result.success
            });

        } catch (error) {
            next(error)
        }
    },

    async verifyOtpForEmailVerification(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const { email,otp } = req.body;
            const result = await AuthService.verifyOtpForEmailVerification(email,otp);

            res.status(200).json({
                success: true,
                message: 'OTP is verified for email verifiction successfully',
                data: result
            });

        } catch (error) {
            next(error)
        }
    },

    async logOutAllSessions(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.logOutAllSessions(req);
            return res.status(200).json({
                success: true,
                message: 'All sessions logged out successfully',
                data: result.status
            });
        } catch (error) {
            next(error)
        }
    },

    async updateUser(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const user_id = req.params.id;
            const result = await AuthService.updateUser(String(user_id), req.body);

            return res.status(200).json({
                success: true,
                message: 'User Updated successfully',
                data: result
            });
        } catch (error) {
            next(error)
        }
    },

    async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const user_id = req.params.id;
            const result = await AuthService.deleteUser(String(user_id));

            return res.status(200).json({
                success: true,
                message: 'User Deleted successfully',
                data: result
            });
        } catch (error) {
            next(error)
        }
    },

    async deleteAllUsers(req: AuthRequest, res: Response, next: NextFunction) {

        try {
            const result = await AuthService.deleteAllUsers();

            return res.status(200).json({
                success: true,
                message: 'All users are deleted successfully',
                data: result
            });
        } catch (error) {
            next(error)
        }
    }
};