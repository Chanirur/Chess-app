import express from "express";
import { login, register, resetPassword, sendEmailVerification, sendResetPassword, verifyEmail } from "../controllers/authControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/send-email-verification", sendEmailVerification);
router.post("/verify-email", verifyEmail)
router.post("/send-reset-password", sendResetPassword);
router.post("/reset-password", resetPassword);


export default router;
