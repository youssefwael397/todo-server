"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTER_UPLOAD = void 0;
const multer_1 = __importDefault(require("multer"));
// Define storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
// Initialize multer with the storage configuration
exports.MULTER_UPLOAD = (0, multer_1.default)({ storage: storage });
