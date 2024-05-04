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
exports.TodoModel = void 0;
const client_1 = require("@prisma/client");
const ServerError_js_1 = __importDefault(require("../utils/errors/ServerError.js"));
const prisma = new client_1.PrismaClient();
class TodoModel {
    static createTodo(title, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.create({
                data: {
                    title,
                    userId,
                },
            });
        });
    }
    static getAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.findMany();
        });
    }
    static getTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    static getTodosByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.findMany({
                where: {
                    userId,
                },
            });
        });
    }
    static updateTodo(newTodo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.update({
                where: {
                    id: newTodo.id,
                },
                data: newTodo,
            });
        });
    }
    static updatePartialTodo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.todo.update({
                where: {
                    id,
                },
                data,
            });
        });
    }
    static deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.todo.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                console.log(error);
                throw new ServerError_js_1.default();
            }
        });
    }
}
exports.TodoModel = TodoModel;
