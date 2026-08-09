
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { changePasswordSchema, signinSchema } from "./auth.schema";
import { validate } from "../../middlewares/validate";

export const AuthRoute = Router();

AuthRoute.post('/sign-up',AuthController.SignUp) ;
AuthRoute.post('/sign-in',validate(signinSchema),AuthController.SignIn) ;
AuthRoute.post('/sign-out',AuthController.SignOut) ;
AuthRoute.post('/change-password',validate(changePasswordSchema),AuthController.changePassword) ;

AuthRoute.post('/request-reset',validate(changePasswordSchema),AuthController.RequestPasswordReset) ;
AuthRoute.post('/reset-password',validate(changePasswordSchema),AuthController.ResetPassword) ;

AuthRoute.post('/forgot-password',validate(changePasswordSchema),AuthController.forgotPasswordByOTP) ;
AuthRoute.post('/verify-otp',validate(changePasswordSchema),AuthController.verifyOTP);
AuthRoute.post('/resetpassword-by-otp',validate(changePasswordSchema),AuthController.resetPasswordByOTP);

AuthRoute.post('/logout-all',AuthController.logOutAllSessions) ;