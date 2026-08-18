import { sendEmail } from "../../services/mail.service";
import { RenderTemplate } from "./renderTemplate"

export const SendingEmailToUser = async(email:string,name:string,url:string)=>{

    try {
        
        const htmlContent = await RenderTemplate('sendEmail',{
            name,
            url
        })
        await sendEmail(email,'Send Email',htmlContent);

    } catch (error) {
        console.error('Error sending email : ',error)
    }
}