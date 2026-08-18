import { NextFunction, Response } from "express";
import { auth } from "../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AuthRequest } from "../types/AuthRequest.type";

export const verifyAuth = async(req:AuthRequest,res:Response,next:NextFunction)=>{

    const session = await auth.api.getSession({
        headers : fromNodeHeaders(req.headers)
    }) ;

    if(!session){
        return res.status(401).send({
            success : false,
            message : 'Unauthorized Access'
        })
    }

    req.user = {
        id : session.user.id,
        name: session.user.name,
        email : session.user.email,
        image: session.user.image ,
        role: session.user.role ?? undefined,
    }; 

    next() ;
}