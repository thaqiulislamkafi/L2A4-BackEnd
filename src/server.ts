import express from "express" ;
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;

const PORT = process.env.PORT || 5000 ;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/',()=>{
    console.log(`Server is running`)
})

app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
})