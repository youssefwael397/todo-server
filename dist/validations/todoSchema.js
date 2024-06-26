"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTodoSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    userId: joi_1.default.number().required(),
});
