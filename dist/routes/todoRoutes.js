"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_js_1 = require("../middleware/jwtMiddleware.js");
const todoController_js_1 = require("../controllers/todoController.js");
const multerSetup_js_1 = require("../utils/multerSetup.js");
const router = (0, express_1.Router)();
// Define routes and connect them to controller methods
router.get('/', jwtMiddleware_js_1.jwtMiddleware, todoController_js_1.TodoController.getTodosByUserId);
router.post('/', jwtMiddleware_js_1.jwtMiddleware, multerSetup_js_1.MULTER_UPLOAD.none(), todoController_js_1.TodoController.createTodo);
router.delete('/:todoId', jwtMiddleware_js_1.jwtMiddleware, todoController_js_1.TodoController.deleteTodo);
router.get('/toggle/:todoId', multerSetup_js_1.MULTER_UPLOAD.none(), jwtMiddleware_js_1.jwtMiddleware, todoController_js_1.TodoController.toggleComplete);
router.put('/', jwtMiddleware_js_1.jwtMiddleware, multerSetup_js_1.MULTER_UPLOAD.none(), todoController_js_1.TodoController.updateTodo);
exports.default = router;
