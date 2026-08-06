
import { Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRoute = Router();

AuthRoute.post('/sign-up',AuthController.SignUp) ;
AuthRoute.post('/sign-in',AuthController.SignIn) ;
AuthRoute.post('/sign-out',AuthController.SignOut) ;

AuthRoute.post('/request-reset',AuthController.RequestPasswordReset) ;
AuthRoute.post('/reset-password',AuthController.ResetPassword) ;

AuthRoute.post('/forgot-password',AuthController.forgotPasswordByOTP) ;
AuthRoute.post('/verify-otp',AuthController.verifyOTP);
AuthRoute.post('/resetpassword-by-otp',AuthController.resetPasswordByOTP)