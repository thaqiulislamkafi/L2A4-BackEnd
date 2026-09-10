import { env } from "../../config/env.config";
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"

export const seedAdmin = async()=>{

    const email = env.ADMIN_EMAIL;
    const password = env.ADMIN_PASSWORD;
    const name = env.ADMIN_NAME;

    const existingAdmin = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if(existingAdmin){
        console.log("Admin is already exist");
        return
    }

    const result = await auth.api.createUser({
        body : {
            name : name,
            email : email,
            password : password,
            data : {
                role : "admin"
            }
        }
    })

    return result

}