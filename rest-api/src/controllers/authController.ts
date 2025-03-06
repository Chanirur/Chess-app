import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { isValidEmail, isValidUsername } from "../utils/validations";
import {
  checkEmailExists,
  checkUsenameExists,
  createUser,
  getUserByValue,
} from "../models/userModels";
import { generateverification_token } from "../utils/generateVerificationToken";
import { generateToken } from "../utils/jwtAuthentication";
import { sendEmailVerification } from "../utils/email";

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password, isApp } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  if (!isValidUsername(username))
    return res
      .status(400)
      .json({ success: false, message: "Invalid Username" });

  const user = await getUserByValue("username", username, [
    "id",
    "password_hash",
    "username",
    "is_verified",
  ]);

  if (!user || !user?.password_hash || !user.username || !user.id)
    return res.status(400).json({ success: false, message: "No such user" });

  if (await bcrypt.compare(password, user.password_hash)) {
    //if (!user.is_verified) return res.status(300).json({ success: false, message: 'Verify Email first', route: '/verify-email' });

    const token = generateToken({ id: user.id, username: user.username });

    if (isApp) {
      res.status(200).json({ success: true, token });
    } else {
      res.cookie("jwtToken", token, {
        httpOnly: true,
        sameSite: true,
      });
      res.status(201).json({ success: true });
    }

    console.log("Login success");
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, isApp } = req.body;

  if (!username || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  if (!isValidUsername(username))
    return res
      .status(400)
      .json({ success: false, message: "Invalid Username" });
  if (!isValidEmail(email))
    return res.status(400).json({ success: false, message: "Invalid Email" });

  if (await checkUsenameExists(username))
    return res
      .status(400)
      .json({ success: false, message: "Username Not Available" });
  if (await checkEmailExists(email))
    return res
      .status(400)
      .json({ success: false, message: "Email Already Exists" });

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const verification_token = generateverification_token();
    const user = await createUser(
      username,
      email,
      password_hash,
      verification_token,
      new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    );

    const token = generateToken({ id: user.id, username: user.username });

    if (isApp) {
      res.status(201).json({
        success: true,
        data: { username: user.username, email: user.email },
        token,
      });
    } else {
      res.cookie("jwtToken", token, {
        httpOnly: true,
        sameSite: true,
      });
      res.status(201).json({
        success: true,
        data: { username: user.username, email: user.email },
      });
    }
    sendEmailVerification(user.email, user.username, user.verification_token);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token } = req.body;
};
