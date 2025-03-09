import express from "express";
import { login, register, resetPassword, sendResetPassword, verifyEmail } from "../controllers/authControllers";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/veriy-email", verifyEmail)
router.post("/send-reset-password", sendResetPassword);
router.post("/reset-password", resetPassword);


export default router;
