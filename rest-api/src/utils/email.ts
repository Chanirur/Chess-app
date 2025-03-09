import nodemailer from 'nodemailer';
import fs from "fs/promises";
import path from 'path';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendEmailVerification = async (
  to: string,
  username: string,
  VerificationCode: string
) => {
  try {
    const templatePath = path.resolve(__dirname, "../templates/emailVerification.html");
    let htmlTemplate = await fs.readFile(templatePath, "utf8");

    const emailContent = htmlTemplate
      .replace(/{{username}}/g, username)
      .replace(/{{VerificationCode}}/g, VerificationCode);

    await transporter.sendMail({
      from: '"64 Squares" <mail.64squares@gmail.com>',
      to,
      subject: 'Verify Your Email to Get Started',
      html: emailContent
    });
    return;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendResetPasswordEmail = async (
  to: string,
  username: string,
  link: string
) => {
  try {
    const templatePath = path.resolve(__dirname, "../templates/resetPassword.html")
    const htmlTemplate = await fs.readFile(templatePath, 'utf8')

    const emailContent = htmlTemplate
      .replace(/{{username}/g, username)
      .replace(/{{link}}/g, link)
    
    await transporter.sendMail({
      from: '"64 Squares" <mail.64squares@gmail.com>',
      to,
      subject: 'Verify Your Email to Get Started',
      html: emailContent
    });
    return;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}