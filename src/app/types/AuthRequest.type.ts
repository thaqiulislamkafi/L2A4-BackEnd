import { Request } from "express";

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string | null;
    role: "user" | "admin" | "provider";
    status: string;
    contact: string;
    age: number | null;
    address: string | null;
}
export interface AuthRequest extends Request {
    user ?: Partial<User>
}