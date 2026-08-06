/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "../../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AuthRequest } from "../../types/AuthRequest.type";

export const AuthService = {

    async SignUp(data: any, req: AuthRequest) {

        const result = await auth.api.signUpEmail({
            body: data,
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        return result;
    },

    async SignIn(data: any, req: AuthRequest) {

        const result = await auth.api.signInEmail({
            body: data,
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        return result;
    },

    async SignOut(req: AuthRequest) {

        const result = await auth.api.signOut({
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        return result;
    },

    async RequestPasswordReset(email:string){

        const result = await auth.api.requestPasswordReset({
            body : {email}
        });
        return result ;
    },

    async ResetPassword(data:any){

        const result = await auth.api.resetPassword({
            body : data
        });
        return result ;
    },

    async forgotPasswordByOTP(email:string){

        const result = await auth.api.requestPasswordResetEmailOTP({
            body : {email}
        })

        return result ;
    },

    async verifyOtp(email:string,otp:string){

        const result = await auth.api.checkVerificationOTP({
            body : {
                email,
                type : 'forget-password',
                otp
            }
        })

        return result ;
    },

    async resetPasswordByOTP(email:string,otp:string,newPassword:string){

        const result = await auth.api.resetPasswordEmailOTP({
            body: {
                email,
                otp,
                password:newPassword
            }
        });

        return result
    }


}