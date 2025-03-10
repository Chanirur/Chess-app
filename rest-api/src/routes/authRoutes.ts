import express from "express";
import { login, register, resetPassword, sendResetPassword, verifyEmail } from "../controllers/authControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/veriy-email", authMiddleware, verifyEmail)
router.post("/send-reset-password", sendResetPassword);
router.post("/reset-password", resetPassword);


export default router;
