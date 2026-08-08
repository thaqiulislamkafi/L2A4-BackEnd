import z from "zod";


/**
 * export const addMealSchema = z.object({
     
     name: z.string("Meal name is required")
         .min(3, "Meal name must be at least 3 characters long"),
 
     image: z.url("Image must be a valid URL").optional(),
 
     description: z.string("Description is required")
         .min(10, "Description must be at least 10 characters long"),
 
     cuisine_type: z.number("Cuisine type is required")
         .int("Cuisine type must be an integer")
         .positive("Cuisine type must be positive"),
 
     dietry_type: z.number("Dietary type is required")
         .int("Dietary type must be an integer")
         .positive("Dietary type must be positive"),
 
     category: z.number("Category is required")
         .int("Category must be an integer")
         .positive("Category must be positive"),
 
     availabilty_status: z.enum(
         ["AVAILABLE", "UNAVAILABLE"],
         "Availability status must be AVAILABLE or UNAVAILABLE"
     ),
 
     price: z.number("Price is required")
         .int("Price must be an integer")
         .nonnegative("Price cannot be negative"),
 
     provider_id: z.string("Provider ID is required")
 });
 
 */
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

