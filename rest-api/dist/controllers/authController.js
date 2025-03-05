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
exports.verifyEmail = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validations_1 = require("../utils/validations");
const userModels_1 = require("../models/userModels");
const generateVerificationToken_1 = require("../utils/generateVerificationToken");
const jwtAuthentication_1 = require("../utils/jwtAuthentication");
const email_1 = require("../utils/email");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, isApp } = req.body;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Provide all fields' });
    if (!(0, validations_1.isValidUsername)(username))
        return res.status(400).json({ success: false, message: 'Invalid Username' });
    const user = yield (0, userModels_1.getUserByValue)('username', username, ['id', 'hashedPassword', 'username', 'isVerified']);
    if (!user || !(user === null || user === void 0 ? void 0 : user.hashedPassword) || !user.username || !user.id)
        return res.status(400).json({ success: false, message: 'No such user' });
    if (yield bcryptjs_1.default.compare(password, user.hashedPassword)) {
        //if (!user.isVerified) return res.status(300).json({ success: false, message: 'Verify Email first', route: '/verify-email' });
        const token = (0, jwtAuthentication_1.generateToken)({ id: user.id, username: user.username });
        if (isApp) {
            res.status(200).json({ success: true, token });
        }
        else {
            res.cookie('jwtToken', token, {
                httpOnly: true,
                sameSite: true
            });
            res.status(201).json({ success: true });
        }
        console.log('Login success');
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, isApp } = req.body;
    if (!username || !email || !password)
        return (res.status(400).json({ success: false, message: 'Provide all fields' }));
    if (!(0, validations_1.isValidUsername)(username))
        return res.status(400).json({ success: false, message: 'Invalid Username' });
    if (!(0, validations_1.isValidEmail)(email))
        return res.status(400).json({ success: false, message: 'Invalid Email' });
    if (yield (0, userModels_1.checkUsenameExists)(username))
        return res.status(400).json({ success: false, message: 'Username Not Available' });
    if (yield (0, userModels_1.checkEmailExists)(email))
        return res.status(400).json({ success: false, message: 'Email Already Exists' });
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = (0, generateVerificationToken_1.generateVerificationToken)();
        const user = yield (0, userModels_1.createUser)(username, email, hashedPassword, verificationToken, new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        );
        const token = (0, jwtAuthentication_1.generateToken)({ id: user.id, username: user.username });
        if (isApp) {
            res.status(201).json({ success: true, data: { username: user.username, email: user.email }, token });
        }
        else {
            res.cookie('jwtToken', token, {
                httpOnly: true,
                sameSite: true
            });
            res.status(201).json({ success: true, data: { username: user.username, email: user.email } });
        }
        (0, email_1.sendEmailVerification)(user.email, user.username, user.verificationToken);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
});
exports.verifyEmail = verifyEmail;
