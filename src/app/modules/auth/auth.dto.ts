
import z from "zod";
import {
    signinSchema,
    signupSchema,
    updateUserSchema,
    changePasswordSchema,
    resetRequestSchema,
    resetPasswordSchema,
    forgotPasswordByOtpSchema,
    verifyOtpSchema,
    resetPasswordByOtpSchema
} from "./auth.schema";

export type SigninDto = z.infer<typeof signinSchema>;

export type SignupDto = z.infer<typeof signupSchema>;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export type ResetRequestDto = z.infer<typeof resetRequestSchema>;

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export type ForgotPasswordByOtpDto = z.infer<typeof forgotPasswordByOtpSchema>;

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export type ResetPasswordByOtpDto = z.infer<typeof resetPasswordByOtpSchema>;
