import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { isValidEmail, isValidUsername } from "../utils/validations";
import { createUser, getUserByValue } from "../models/userModels";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateTokenAndSetCookie } from "../utils/jwtAuthentication";
import { sendEmailVerification } from "../utils/email";

export const login = (req: Request, res: Response) => {
	res.status(200).json({ message: "Login successful" });
};

export const register = async (req: Request, res: Response): Promise<any> => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) return (res.status(400).json({ success: false, message: 'Provide all fields' }));
	if (!isValidUsername(username)) return res.status(400).json({ success: false, message: 'Invalid Username' });
	if (!isValidEmail(email)) return res.status(400).json({ sucess: false, message: 'Invalid Email' });
	
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationToken = generateVerificationToken();
		const user = await createUser(
			username,
			email,
			hashedPassword,
			verificationToken,
			new Date(Date.now() + 60 * 60 * 1000) // 1 hour
		);

		const userID = await getUserByValue('username', user.username, ['id'])
		if (!userID || userID.id) return res.status(500).json({ success: false, message: 'Internal DB error' });
		generateTokenAndSetCookie(res, userID?.id || NaN);
		
		res.status(201).json({ success: true, data: { username: user.username, email: user.email } });

		sendEmailVerification(user.email, user.username, user.verificationToken);
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Error with password' });
	}
	
};
