import z from "zod";

export const signinSchema = z.object({
    email: z.email("Email must be a valid email address"),
    password: z.string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password cannot be longer than 32 characters")
});

export const signupSchema = z.object({

    name: z.string("Name is required")
        .min(3, "Name must be at least 3 characters long"),

    email: z.email("Email must be a valid email address"),

    password: z.string("Password is required")
        .min(8, "Password must be at least 8 characters long"),

    image: z.url("Image must be a valid URL").optional(),

    contact: z.string("Contact is required")
        .min(5, "Contact must be at least 5 characters long").optional(),

    age: z.number("Age must be a number")
        .int("Age must be an integer")
        .positive("Age must be greater than 0")
        .optional(),

    address: z.string("Address is required")
        .min(3, "Address must be at least 3 characters long")
        .optional()

});

export const updateUserSchema = z.object({

    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .optional(),

    email: z.email("Email must be a valid email address")
        .optional(),

    image: z.url("Image must be a valid URL")
        .optional(),

    contact: z.string()
        .min(5, "Contact must be at least 5 characters long")
        .optional(),

    age: z.number()
        .int("Age must be an integer")
        .positive("Age must be greater than 0")
        .optional(),

    address: z.string()
        .min(3, "Address must be at least 3 characters long")
        .optional()

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

