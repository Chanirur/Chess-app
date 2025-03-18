import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { isValidEmail, isValidUsername } from "../utils/validations";
import {
  checkEmailExists,
  checkUsenameExists,
  checkUserExistsFromIdAndUsername,
  createUser,
  getUserByValue,
  updatePassword,
  User,
  verifyUser,
} from "../models/userModel";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import {
  generateAuthenticationToken,
  generateEmailVerifictionToken,
  generatePasswordResetToken,
} from "../utils/jwtTokens";
import { sendEmailVerificationEmail, sendResetPasswordEmail } from "../utils/email";
import jwt from "jsonwebtoken";

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
    const token = generateAuthenticationToken({
      id: user.id,
      username: user.username,
    });

    if (isApp) {
      res.status(200).json({ success: true, token });
    } else {
      res.cookie("jwtToken", token, {
        httpOnly: true,
        sameSite: "strict", // Ensure sameSite is set correctly
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
        path: "/", // Set the path to the root of the domain
      });
      res.status(201).json({ success: true });
    }

    console.log("Login success");
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
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
    const user = await createUser(
      username,
      email,
      password_hash,
    );

    const token = generateAuthenticationToken({
      id: user.id,
      username: user.username,
    });

    if (isApp) {
      res.status(201).json({
        success: true,
        data: { username: user.username, email: user.email },
        token,
      });
    } else {
      res.cookie("jwtToken", token, {
        httpOnly: true,
        sameSite: "strict", // Ensure sameSite is set correctly
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
      });
      res.status(201).json({
        success: true,
        data: { username: user.username, email: user.email },
      });
    }

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const sendEmailVerification = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json({ success: false, message: "Invalid Email" });

  const user = await getUserByValue("email", email, [
    "id",
    "email",
    "username",
    "is_verified",
  ]);

  if (!user || !user.email || !user.id || !user.username)
    return res.status(400).json({ success: false, message: "No such user" });

  if (user.is_verified)
    return res
      .status(400)
      .json({ success: false, message: "Email already verified" });

  const token = generateEmailVerifictionToken({
    id: user.id,
    username: user.username,
  });

  sendEmailVerificationEmail(user.email, user.username, token);

  res.status(200).json({ success: true, message: "Email Sent" });
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token } = req.body;
  
  if (!token)
    return res.status(400).json({ success: false, message: "No token" });
  

};

export const sendResetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json({ success: false, message: "Invalid Email" });

  const user = await getUserByValue("email", email, [
    "id",
    "email",
    "is_verified",
  ]);

  if (!user || !user.email || !user.id || !user.username)
    return res.status(400).json({ success: false, message: "No such user" });

  const token = generatePasswordResetToken({
    id: user.id,
    username: user.username,
  });

  sendResetPasswordEmail(user.email, user.username, token);
  res.status(200).json({ success: true, message: "Email Verified" });
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, newPassword } = req.body;

  interface DecodedToken {
    id: User["id"];
    username: User["username"];
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_PASSWORD_RESET_SECRET as string
  ) as DecodedToken;

  const user = await checkUserExistsFromIdAndUsername(
    decoded.id as User["id"],
    decoded.username
  );
  if (!user) {
    return res
      .status(403)
      .json({ error: "Invalid user or user does not exist" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  updatePassword(decoded.id, hashedPassword);
  res.status(200).json({ success: true, message: "Password Changed" });
};
