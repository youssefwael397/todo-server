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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserModel {
    static createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                },
            });
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.update({
                where: {
                    id,
                },
                data,
            });
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.delete({
                where: {
                    id,
                },
            });
        });
    }
    static checkDuplicateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return !!existingUser;
        });
    }
}
exports.default = UserModel;
