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
exports.checkUserExistsFromIdAndUsername = exports.checkEmailExists = exports.checkUsenameExists = exports.createUser = void 0;
exports.getUserByValue = getUserByValue;
const db_1 = __importDefault(require("../config/db"));
const tableName = 'users';
function getUserByValue(field, value, selectFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const selected = selectFields.join(", ");
        const query = `SELECT ${selected} FROM ${tableName} WHERE ${field} = $1`;
        const values = [value];
        try {
            const result = yield db_1.default.query(query, values);
            return result.rows[0] || null; // Return first user found
        }
        catch (err) {
            console.error("Database error:", err);
            throw err;
        }
    });
}
const createUser = (username, email, hashedPassword, verificationToken, verificationExpiry) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO ${tableName} (username, email, password_hash, verification_token, verification_expiry) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [username, email, hashedPassword, verificationToken, verificationExpiry];
    try {
        const result = yield db_1.default.query(query, values);
        return result.rows[0];
    }
    catch (err) {
        console.error('Database Error', err);
    }
});
exports.createUser = createUser;
const checkUsenameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT id FROM users WHERE username = $1';
    const values = [username];
    try {
        const result = yield db_1.default.query(query, values);
        if (result.rows.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error('Database Error', err);
    }
});
exports.checkUsenameExists = checkUsenameExists;
const checkEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT id FROM users WHERE email = $1';
    const values = [email];
    try {
        const result = yield db_1.default.query(query, values);
        if (result.rows.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error('Database Error', err);
    }
});
exports.checkEmailExists = checkEmailExists;
const checkUserExistsFromIdAndUsername = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE id = $1 AND username = $2) AS user_exists';
    const values = [id, username];
    try {
        const result = yield db_1.default.query(query, values);
        return result.rows[0].user_exists;
    }
    catch (err) {
        console.error('Database Error', err);
    }
});
exports.checkUserExistsFromIdAndUsername = checkUserExistsFromIdAndUsername;
