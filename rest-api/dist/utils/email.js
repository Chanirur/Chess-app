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
exports.sendEmailVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});
const sendEmailVerification = (to, username, VerificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templatePath = path_1.default.resolve(__dirname, "../templates/emailVerification.html");
        let htmlTemplate = yield promises_1.default.readFile(templatePath, "utf8");
        const emailContent = htmlTemplate
            .replace(/{{username}}/g, username)
            .replace(/{{VerificationCode}}/g, VerificationCode);
        yield transporter.sendMail({
            from: '"Your App" <mail.64squares@gmail.com>',
            to,
            subject: 'Verify Your Email to Get Started',
            html: emailContent
        });
        console.log("Email sent successfully!");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.sendEmailVerification = sendEmailVerification;
