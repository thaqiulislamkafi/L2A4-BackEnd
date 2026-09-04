import z from "zod";
import dotenv from 'dotenv'
import { envType } from "../app/types/env.type";
dotenv.config()

const envSchema = z.object({

    DATABASE_URL: z.string().min(3, 'Database URL is required'),
    EMAIL_SENDER_SMTP_HOST: z.string(),
    EMAIL_SENDER_SMTP_PORT: z.string().min(3, 'PORT number minimum 3 digits required'),
    EMAIL_SENDER_SMTP_USER: z.email('Invalid Email Type'),
    EMAIL_SENDER_SMTP_PASS: z.string('Password is required'),
    EMAIL_SENDER_SMTP_FROM: z.email('Invalid Email Type'),
    CLOUDINARY_CLOUD_NAME: z.string().min(3, 'Cloudinary Cloud Name is required'),
    CLOUDINARY_API_KEY: z.string().min(3, 'Cloudinary API Key is required'),
    CLOUDINARY_API_SECRET: z.string().min(3, 'Cloudinary API Secret is required'),
    BETTER_AUTH_SECRET: z.string().min(3, 'Better Auth Secret is required'),
    BETTER_AUTH_URL: z.string().min(3, 'Better Auth URL is required')
})

const parsedEnvSchema = envSchema.safeParse(process.env)

if (!parsedEnvSchema.success) {
    console.error('')
    console.error(parsedEnvSchema.error)
    process.exit(1)
}

export const env: envType = parsedEnvSchema.data