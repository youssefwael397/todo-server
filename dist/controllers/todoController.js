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
exports.TodoController = void 0;
const todoModel_js_1 = require("../models/todoModel.js");
const todoSchema_js_1 = require("../validations/todoSchema.js");
const ValidationError_js_1 = __importDefault(require("../utils/errors/ValidationError.js"));
class TodoController {
    static getAllTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield todoModel_js_1.TodoModel.getAllTodos();
                res.json({ data: todos });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.jwtData.user.id;
                const { title } = req.body;
                const payload = { userId, title };
                const { error } = todoSchema_js_1.createTodoSchema.validate(payload, {
                    abortEarly: false,
                });
                // validate joi schema first
                if (error)
                    ValidationError_js_1.default.handleValidationError(error, res);
                const todo = yield todoModel_js_1.TodoModel.createTodo(title, userId);
                res.json({ message: 'Todo created successfully', data: todo });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { todo } = req.body;
                const updated_todo = yield todoModel_js_1.TodoModel.updateTodo(todo);
                res.json({ message: 'Todo updated successfully', data: updated_todo });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTodosById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const todo = yield todoModel_js_1.TodoModel.getTodoById(Number(id));
                res.json({ data: todo });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTodosByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.jwtData.user.id;
                const todos = yield todoModel_js_1.TodoModel.getTodosByUserId(Number(id));
                res.json({ data: todos });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { todoId } = req.params;
                yield todoModel_js_1.TodoModel.deleteTodo(Number(todoId));
                res.json({ message: 'Todo deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static toggleComplete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { todoId } = req.params;
                const todo = yield todoModel_js_1.TodoModel.getTodoById(Number(todoId));
                if (!todo) {
                    res.status(404).json({ message: 'Todo not found' });
                    return;
                }
                const updatedTodo = yield todoModel_js_1.TodoModel.updatePartialTodo(Number(todoId), Object.assign(Object.assign({}, todo), { completed: !todo.completed }));
                res.json({
                    message: `Todo marked as ${todo.completed ? 'Uncompleted' : 'Completed'}`,
                    data: updatedTodo,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TodoController = TodoController;
