/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { SendingEmailToUser } from "../app/utils/sendEmail";
import { emailOTP } from "better-auth/plugins";
import { SendEmailVeification } from "../app/utils/SendEmailVerification";
import { env } from "../config/env.config";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    baseURL : env.BETTER_AUTH_URL,
    advanced : {
        defaultCookieAttributes :{
            sameSite : 'None',
            secure : true,
            httpOnly : true
        }
    },
    trustedOrigins: ['http://localhost:4000', 'http://localhost:3000','https://l2-a4-frontend-one.vercel.app'],
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void SendingEmailToUser(user.email,user.name,url);
        },
        // sendVerificationEmail: async ({ user, url }) => {
        //     SendingEmailToUser(user.email, user.name, url);
        // },
    },
    socialProviders : {
        google : {
            clientId : env.GOOGLE_CLIENT_ID,
            clientSecret : env.GOOGLE_CLIENT_SECRET,
            prompt : "select_account",
            disableImplicitSignUp : true
        }
    },
    account : {
        accountLinking : {
            disableImplicitLinking : true
        }
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
            changeEmail:{
                enabled : true
            },
            async sendVerificationOTP({email,otp,type}){
                if(type == 'forget-password'){
                    SendEmailVeification(email,'Dear User',otp)
                }
                else if(type == 'email-verification'){
                    SendEmailVeification(email,'Dear User',otp)
                }
                else if(type=='change-email'){
                    SendEmailVeification(email,'Dear User',otp)
                }
            },
            otpLength : 6,
            expiresIn : 300,
            allowedAttempts : 3,
            overrideDefaultEmailVerification : true
        })
    ]
});