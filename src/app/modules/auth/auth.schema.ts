import z from "zod";

export const signinSchema = z.object({
    email: z.email("Email must be a valid email address"),
    password: z.string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password cannot be longer than 32 characters")
});

export const changePasswordSchema = z.object({
    password: z.string("Old password is required")
        .min(8, "Old password must be at least 8 characters long")
        .max(32, "Old password cannot be longer than 32 characters"),
    newPassword: z.string("New password is required")
        .min(8, "New password must be at least 8 characters long")
        .max(32, "New password cannot be longer than 32 characters"),
})

export const resetRequestSchema = z.object({
    email: z.email("Email must be a valid email address")
});

export const resetPasswordSchema = z.object({
    token: z.string("Token is required"),
    newPassword: z.string("New password is required")
        .min(8, "New password must be at least 8 characters long")
        .max(32, "New password cannot be longer than 32 characters"),
})


export const forgotPasswordByOtpSchema = z.object({
    email: z.email("Email must be a valid email address")
});

export const verifyOtpSchema = z.object({
    email: z.email("Email must be a valid email address"),
    otp: z.string("OTP is required")
        .length(6, "OTP must be 6 characters long")
});


export const resetPasswordByOtpSchema = z.object({
    email: z.email("Email must be a valid email address"),
    otp: z.string("OTP is required")
        .length(6, "OTP must be 6 characters long"),
    newPassword: z.string("New password is required")
        .min(8, "New password must be at least 8 characters long")
        .max(32, "New password cannot be longer than 32 characters"),
})

