import { env } from "./env.config";

export const mailConfig = {

    secure : true ,
    auth : {
        user : env.EMAIL_SENDER_SMTP_USER,
        pass : env.EMAIL_SENDER_SMTP_PASS
    },
    host : env.EMAIL_SENDER_SMTP_HOST,
    port : Number(env.EMAIL_SENDER_SMTP_PORT)
}