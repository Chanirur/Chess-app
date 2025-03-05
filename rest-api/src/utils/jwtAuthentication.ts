import jwt from 'jsonwebtoken';
import { Response } from "express";
import { User } from "../models/userModels"

interface UserProps {
    id: User['id'];
    username: User['username'];
}

export const generateToken = (user: UserProps) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    });

    return token;
}