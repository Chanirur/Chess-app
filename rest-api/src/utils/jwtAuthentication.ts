import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Response } from "express";

//if (!process.env.JWT_SECRET) throw new Error("No JWT Secret");


export const generateTokenAndSetCookie = (res: Response, userId:number) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    });

    res.cookie('jwtToken', token, {
        httpOnly: true, // XSS protection
        secure: process.env.NODE_ENV === 'production', // only use HTTPS in prod
        sameSite: 'strict', // CSRF protection
        maxAge: 1 * 60 * 60 * 100 // 1 day
    });

}