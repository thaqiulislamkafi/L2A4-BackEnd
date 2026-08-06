
import { Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRoute = Router();

AuthRoute.post('/sign-up',AuthController.SignUp) ;
AuthRoute.post('/sign-in',AuthController.SignIn) ;
AuthRoute.post('/sign-out',AuthController.SignOut) ;