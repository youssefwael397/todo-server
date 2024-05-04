"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_js_1 = __importDefault(require("./CustomError.js"));
class ServerError extends CustomError_js_1.default {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}
exports.default = ServerError;
