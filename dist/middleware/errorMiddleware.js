"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_js_1 = __importDefault(require("../utils/errors/CustomError.js"));
const ValidationError_js_1 = __importDefault(require("../utils/errors/ValidationError.js"));
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof CustomError_js_1.default) {
        const { statusCode = 500, message = 'Internal Server Error' } = error;
        res.status(statusCode).json({ message });
    }
    else if (error instanceof ValidationError_js_1.default) {
        // Handle validation error
        res.status(400).json({ errors: error.validationErrors });
    }
    else {
        const { message = 'Internal Server Error' } = error;
        res.status(500).json({ message });
    }
};
exports.default = errorMiddleware;
