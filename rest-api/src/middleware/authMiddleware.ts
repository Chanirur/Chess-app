import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkUserExistsFromIdAndUsername } from "../models/userModel";

interface DecodedToken {
    id: string;
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; username: string };
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies?.jwtToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, mesage: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        const user = await checkUserExistsFromIdAndUsername(parseInt(decoded.id), decoded.username);
        if (!user) {
            return res.status(403).json({ error: "Invalid user or user does not exist" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
