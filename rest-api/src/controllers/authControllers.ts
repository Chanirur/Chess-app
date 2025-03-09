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
  generatePasswordResetToken,
} from "../utils/jwtTokens";
import { sendEmailVerification, sendResetPasswordEmail } from "../utils/email";
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
    //if (!user.is_verified) return res.status(300).json({ success: false, message: 'Verify Email first', route: '/verify-email' });

    const token = generateAuthenticationToken({
      id: user.id,
      username: user.username,
    });

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
    const verification_token = generateVerificationToken();
    const user = await createUser(
      username,
      email,
      password_hash,
      verification_token,
      new Date(Date.now() + 60 * 60 * 1000) // 1 hour
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
  const user = req.user;
  const { token } = req.body;
  if (!user)
    return res.status(400).json({ success: false, message: "No user" });

  if (!token)
    return res.status(400).json({ success: false, message: "No token" });

  const correctToken = await getUserByValue("id", user.id, [
    "verification_token",
    "verification_expiry",
  ]);
  if (
    !correctToken ||
    correctToken.verification_expiry ||
    correctToken.verification_token
  )
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });

  if (correctToken.verification_token !== token)
    return res.status(400).json({ success: false, message: "Invalid token" });
  if (
    correctToken.verification_expiry &&
    correctToken.verification_expiry < Date.now()
  )
    return res.status(400).json({ success: false, message: "Token expired" });

  res.status(200).json({ success: true, message: "Verified" });

  await verifyUser(user.id);
};

export const sendResetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "No email" });

  const user = await getUserByValue("email", email, ["username", "id"]);

  if (user && user.username && user.id) {
    const userArgs = {
      id: user.id as User["id"],
      username: user.username as User["username"],
    };

    const token = generatePasswordResetToken(userArgs);
    const link = `${req.hostname}/reset-password/${token}`;

    sendResetPasswordEmail(email, user.username, link);
  }

  if (!user || !user.email || !user.id)
    res
      .status(200)
      .json({
        success: false,
        message: "If such user exists, a email has been sent.",
      });
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
    process.env.JWT_SECRET as string
  ) as DecodedToken;

  const user = await checkUserExistsFromIdAndUsername(
    decoded.id as User['id'],
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
