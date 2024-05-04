"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const Jwt_js_1 = require("../utils/Jwt.js");
const CustomError_js_1 = __importDefault(require("../utils/errors/CustomError.js"));
function jwtMiddleware(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return next(new CustomError_js_1.default('Authorization header missing', 401));
    }
    const token = authorizationHeader.split(' ')[1]; // Extract the token from the "Bearer" token format
    try {
        // Verify the access token using your Jwt class
        const decodedToken = Jwt_js_1.Jwt.verifyAccessToken(token);
        // Add the decoded token data to the request for later use
        req.jwtData = decodedToken;
        next();
    }
    catch (error) {
        next(new CustomError_js_1.default('Invalid access token', 401));
    }
}
exports.jwtMiddleware = jwtMiddleware;
