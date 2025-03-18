"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerifictionToken = exports.generatePasswordResetToken = exports.generateAuthenticationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAuthenticationToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
};
exports.generateAuthenticationToken = generateAuthenticationToken;
const generatePasswordResetToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_PASSWORD_RESET_SECRET, {
        expiresIn: '15m'
    });
    return token;
};
exports.generatePasswordResetToken = generatePasswordResetToken;
const generateEmailVerifictionToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_EMAIL_VERIFICATION_SECRET, {
        expiresIn: '15m'
    });
    return token;
};
exports.generateEmailVerifictionToken = generateEmailVerifictionToken;
