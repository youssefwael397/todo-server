"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const homeRoutes_js_1 = __importDefault(require("./routes/homeRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const todoRoutes_js_1 = __importDefault(require("./routes/todoRoutes.js"));
const errorMiddleware_js_1 = __importDefault(require("./middleware/errorMiddleware.js"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/', homeRoutes_js_1.default);
app.use('/api', userRoutes_js_1.default);
app.use('/api/todos', todoRoutes_js_1.default);
// middlewares
app.use(errorMiddleware_js_1.default);
// Middleware to handle CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON request body
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});
