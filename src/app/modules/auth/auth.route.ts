
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { changePasswordSchema, signinSchema, signupSchema, updateUserSchema } from "./auth.schema";
import { validate } from "../../middlewares/validate";
import { mealUpload } from "../../../config/multerCloudinary";

export const AuthRoute = Router();

AuthRoute.get('/',AuthController.getAllUsers) ;
AuthRoute.get('/:id',AuthController.getUserById) ;
AuthRoute.post('/image-upload',mealUpload.single('file'),AuthController.uploadUserImage);

AuthRoute.post('/sign-up',validate(signupSchema),AuthController.SignUp) ;
AuthRoute.post('/sign-in',validate(signinSchema),AuthController.SignIn) ;
AuthRoute.post('/sign-out',AuthController.SignOut) ;
AuthRoute.post('/get-me',AuthController.GetMe) ;

AuthRoute.post('/change-password',validate(changePasswordSchema),AuthController.changePassword) ;
AuthRoute.post('/request-reset',validate(changePasswordSchema),AuthController.RequestPasswordReset) ;
AuthRoute.post('/reset-password',validate(changePasswordSchema),AuthController.ResetPassword) ;

AuthRoute.post('/forgot-password',AuthController.forgotPasswordByOTP) ;
AuthRoute.post('/verify-otp',AuthController.verifyOtpForForgetPassword);
AuthRoute.post('/resetpassword-by-otp',AuthController.resetPasswordByOTP);

AuthRoute.post('/send-email-otp',AuthController.sendOtpForEmailVerification) ;
AuthRoute.post('/verify-otp-email',AuthController.verifyOtpForEmailVerification) ;
AuthRoute.post('/change-email',AuthController.ChangeEmailByOTP) ;
AuthRoute.post('/otp-change-email',AuthController.requestEmailChangeOTP) ;

AuthRoute.post('/logout-all',AuthController.logOutAllSessions) ;
AuthRoute.put('/:id',validate(updateUserSchema),AuthController.updateUser) ;
AuthRoute.delete('/:id',AuthController.deleteUser) ;
AuthRoute.delete('/',AuthController.deleteAllUsers) ;