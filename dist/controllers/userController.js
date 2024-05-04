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
exports.UserController = void 0;
const userSchema_js_1 = require("../validations/userSchema.js");
const ValidationError_js_1 = __importDefault(require("../utils/errors/ValidationError.js"));
const DuplicateError_js_1 = __importDefault(require("../utils/errors/DuplicateError.js"));
const NotFoundError_js_1 = __importDefault(require("../utils/errors/NotFoundError.js"));
const ServerError_js_1 = __importDefault(require("../utils/errors/ServerError.js"));
const Bcrypt_js_1 = require("../utils/Bcrypt.js");
const CustomError_js_1 = __importDefault(require("../utils/errors/CustomError.js"));
const Jwt_js_1 = require("../utils/Jwt.js");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
class UserController {
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_js_1.default.getAllUsers();
                res.json({ data: users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = userSchema_js_1.createUserSchema.validate(req.body, {
                    abortEarly: false,
                });
                // validate joi schema first
                if (error)
                    ValidationError_js_1.default.handleValidationError(error, res);
                const { username, email, password } = req.body;
                // check if user's email already exists
                const isDuplicate = yield userModel_js_1.default.checkDuplicateEmail(email);
                if (isDuplicate)
                    throw new DuplicateError_js_1.default('Email already in use');
                // hasing the password to save to db
                const hashed_password = yield Bcrypt_js_1.Bcrypt.hashPassword(password);
                if (!hashed_password)
                    throw new ServerError_js_1.default('Unexpected error while creating new user');
                // create a new user
                yield userModel_js_1.default.createUser(username, email, hashed_password);
                // new user created successfully
                res.json({ message: 'User is created successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = userSchema_js_1.loginSchema.validate(req.body, {
                    abortEarly: false,
                });
                // validate joi schema first
                if (error)
                    ValidationError_js_1.default.handleValidationError(error, res);
                const { email, password } = req.body;
                // find user by email
                const user = yield userModel_js_1.default.getByEmail(email);
                if (!user)
                    throw new CustomError_js_1.default('Bad credentials', 400);
                // check for password validations if user is existing
                const isValid = yield Bcrypt_js_1.Bcrypt.comparePasswords(password, user.password);
                if (!isValid)
                    throw new CustomError_js_1.default('Bad credentials', 400);
                // Generate an access token
                const accessToken = Jwt_js_1.Jwt.generateAccessToken(user);
                // Respond with tokens
                res.json({
                    message: 'Login successfully',
                    accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.jwtData.user;
                const user = yield userModel_js_1.default.getUserById(id);
                if (!user)
                    throw new NotFoundError_js_1.default('User Not found');
                res.json({ data: user });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
