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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Cookies:", req.cookies);
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwtToken;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield (0, userModel_1.checkUserExistsFromIdAndUsername)(parseInt(decoded.id), decoded.username);
        if (!user) {
            return res
                .status(403)
                .json({ error: "Invalid user or user does not exist" });
        }
        req.user = { id: parseInt(decoded.id), username: decoded.username };
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
});
exports.authMiddleware = authMiddleware;
