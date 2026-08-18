import nodemailer from 'nodemailer' ;
import { mailConfig } from '../config/mail.config';
import { env } from '../config/env.config';

export const sendEmail = async(to:string, subject: string, html: string)=>{

    const transporter = nodemailer.createTransport(mailConfig) ;

    try {
        
        const info = await transporter.sendMail({
            from : env.EMAIL_SENDER_SMTP_FROM,
            to,
            subject,
            html
        }) ;

        console.log('Email sent' + info.response)
    } catch (error) {
        console.error('Error sending mail: ',error)
    }
}