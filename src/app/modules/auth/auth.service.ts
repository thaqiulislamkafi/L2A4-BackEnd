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


}