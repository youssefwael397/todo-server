"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const CustomError_js_1 = __importDefault(require("./errors/CustomError.js"));
dotenv_1.default.config();
class Jwt {
    static generateAccessToken(user) {
        const accessToken = jsonwebtoken_1.default.sign({ user: user }, Jwt.ACCESS_TOKEN_KEY, { expiresIn: '30d' } // Set the expiration time for the access token
        );
        return accessToken;
    }
    static verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, Jwt.ACCESS_TOKEN_KEY);
        }
        catch (error) {
            throw new CustomError_js_1.default('Invalid access token', 401);
        }
    }
    static decrypt(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, Jwt.ACCESS_TOKEN_KEY);
            console.log("🚀 ~ Jwt ~ decrypt ~ decodedToken:", decodedToken);
            return decodedToken;
        }
        catch (error) {
            throw new CustomError_js_1.default('Failed to decrypt token', 401);
        }
    }
}
exports.Jwt = Jwt;
Jwt.ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY || 'hard-coded-secret';
