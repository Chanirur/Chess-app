"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendResetPassword = exports.verifyEmail = exports.sendEmailVerification = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validations_1 = require("../utils/validations");
const userModel_1 = require("../models/userModel");
const jwtTokens_1 = require("../utils/jwtTokens");
const email_1 = require("../utils/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, isApp } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "Provide all fields" });
    if (!(0, validations_1.isValidUsername)(username))
        return res
            .status(400)
            .json({ success: false, message: "Invalid Username" });
    const user = yield (0, userModel_1.getUserByValue)("username", username, [
        "id",
        "password_hash",
        "username",
        "is_verified",
    ]);
    if (!user || !(user === null || user === void 0 ? void 0 : user.password_hash) || !user.username || !user.id)
        return res.status(400).json({ success: false, message: "No such user" });
    if (yield bcryptjs_1.default.compare(password, user.password_hash)) {
        const token = (0, jwtTokens_1.generateAuthenticationToken)({
            id: user.id,
            username: user.username,
        });
        if (isApp) {
            res.status(200).json({ success: true, token });
        }
        else {
            res.cookie("jwtToken", token, {
                httpOnly: true,
                sameSite: "strict", // Ensure sameSite is set correctly
                secure: process.env.NODE_ENV === "production", // Set secure flag in production
                path: "/", // Set the path to the root of the domain
            });
            res.status(201).json({ success: true });
        }
        console.log("Login success");
    }
    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, isApp } = req.body;
    if (!username || !email || !password)
        return res
            .status(400)
            .json({ success: false, message: "Provide all fields" });
    if (!(0, validations_1.isValidUsername)(username))
        return res
            .status(400)
            .json({ success: false, message: "Invalid Username" });
    if (!(0, validations_1.isValidEmail)(email))
        return res.status(400).json({ success: false, message: "Invalid Email" });
    if (yield (0, userModel_1.checkUsenameExists)(username))
        return res
            .status(400)
            .json({ success: false, message: "Username Not Available" });
    if (yield (0, userModel_1.checkEmailExists)(email))
        return res
            .status(400)
            .json({ success: false, message: "Email Already Exists" });
    try {
        const password_hash = yield bcryptjs_1.default.hash(password, 10);
        const user = yield (0, userModel_1.createUser)(username, email, password_hash);
        const token = (0, jwtTokens_1.generateAuthenticationToken)({
            id: user.id,
            username: user.username,
        });
        if (isApp) {
            res.status(201).json({
                success: true,
                data: { username: user.username, email: user.email },
                token,
            });
        }
        else {
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.register = register;
const sendEmailVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!(0, validations_1.isValidEmail)(email))
        return res.status(400).json({ success: false, message: "Invalid Email" });
    const user = yield (0, userModel_1.getUserByValue)("email", email, [
        "id",
        "email",
        "is_verified",
    ]);
    if (!user || !user.email || !user.id || !user.username)
        return res.status(400).json({ success: false, message: "No such user" });
    if (user.is_verified)
        return res
            .status(400)
            .json({ success: false, message: "Email already verified" });
    const token = (0, jwtTokens_1.generateEmailVerifictionToken)({
        id: user.id,
        username: user.username,
    });
    const verificationToken = (0, jwtTokens_1.generateEmailVerifictionToken)({
        id: user.id,
        username: user.username,
    });
    const link = `${req.hostname}/verify-email/${verificationToken}`;
    (0, email_1.sendEmailVerificationEmail)(user.email, user.username, link);
    res.status(200).json({ success: true, message: "Email Sent" });
});
exports.sendEmailVerification = sendEmailVerification;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token)
        return res.status(400).json({ success: false, message: "No token" });
});
exports.verifyEmail = verifyEmail;
const sendResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!(0, validations_1.isValidEmail)(email))
        return res.status(400).json({ success: false, message: "Invalid Email" });
    const user = yield (0, userModel_1.getUserByValue)("email", email, [
        "id",
        "email",
        "is_verified",
    ]);
    if (!user || !user.email || !user.id || !user.username)
        return res.status(400).json({ success: false, message: "No such user" });
    const token = (0, jwtTokens_1.generatePasswordResetToken)({
        id: user.id,
        username: user.username,
    });
    (0, email_1.sendResetPasswordEmail)(user.email, user.username, token);
    res.status(200).json({ success: true, message: "Email Verified" });
});
exports.sendResetPassword = sendResetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD_RESET_SECRET);
    const user = yield (0, userModel_1.checkUserExistsFromIdAndUsername)(decoded.id, decoded.username);
    if (!user) {
        return res
            .status(403)
            .json({ error: "Invalid user or user does not exist" });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    (0, userModel_1.updatePassword)(decoded.id, hashedPassword);
    res.status(200).json({ success: true, message: "Password Changed" });
});
exports.resetPassword = resetPassword;
