import jwt from 'jsonwebtoken';
import { Response } from "express";
import { User } from "../models/userModel"

interface UserProps {
    id: User['id'];
    username: User['username'];
}

export const generateAuthenticationToken = (user: UserProps) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });

    return token;
}

export const generatePasswordResetToken = (user: UserProps) => {
    const token = jwt.sign({ user }, process.env.JWT_PASSWORD_RESET_SECRET as string, {
        expiresIn: '15m'
    });

    return token;
}