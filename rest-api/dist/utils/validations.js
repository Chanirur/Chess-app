"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidUsername = exports.emailRegex = exports.usernameRegex = void 0;
exports.usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
exports.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidUsername = (username) => exports.usernameRegex.test(username);
exports.isValidUsername = isValidUsername;
const isValidEmail = (email) => exports.emailRegex.test(email);
exports.isValidEmail = isValidEmail;
