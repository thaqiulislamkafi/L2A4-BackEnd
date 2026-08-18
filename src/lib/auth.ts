/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { SendingEmailToUser } from "../app/utils/sendEmail";
import { emailOTP } from "better-auth/plugins";
import { SendEmailVeification } from "../app/utils/SendEmailVerification";
// If your Prisma file is located elsewhere, you can change the path


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    trustedOrigins: ['http://localhost:4000', 'http://localhost:3000'],
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void SendingEmailToUser(user.email,user.name,url);
        },
        // sendVerificationEmail: async ({ user, url }) => {
        //     SendingEmailToUser(user.email, user.name, url);
        // },
    },
    user: {
        additionalFields: {
            role: {
                type: ["admin", "user", "provider"],
                defaultValue: "user",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "active"
            },
            contact : {
                type : "string",
                defaultValue : ''
            },
            age : {
                type : 'number'
            },
            address : {
                type : "string"
            }
        }
    },
    plugins : [
        emailOTP({
            async sendVerificationOTP({email,otp,type}){
                if(type == 'forget-password'){
                    SendEmailVeification(email,'Dear User',otp)}
            },
            otpLength : 6,
            expiresIn : 300,
            allowedAttempts : 3
        })
    ]
});