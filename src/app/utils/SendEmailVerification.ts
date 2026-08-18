import { sendEmail } from "../../services/mail.service";
import { RenderTemplate } from "./renderTemplate";

export const SendEmailVeification = async(email:string,name:string='Dear User',otp:string)=>{

    try {
        
        const htmlContent = await RenderTemplate('verifyEmail',{
            name,
            otp
        })
        await sendEmail(email,'Email Verification',htmlContent) ;
        
    } catch (error) {
        console.error('Error sending email verification:', error);
        
    }
}