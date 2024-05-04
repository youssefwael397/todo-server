import { Router } from 'express';
import { jwtMiddleware } from '../middleware/jwtMiddleware.js';
import { TodoController } from '../controllers/todoController.js';
import { MULTER_UPLOAD } from '../utils/multerSetup.js';

const router = Router();

// Define routes and connect them to controller methods
router.get('/', jwtMiddleware, TodoController.getTodosByUserId);
router.post('/', jwtMiddleware, MULTER_UPLOAD.none(), TodoController.createTodo);
router.delete('/:todoId', jwtMiddleware, TodoController.deleteTodo);
router.get('/toggle/:todoId',MULTER_UPLOAD.none(),jwtMiddleware, TodoController.toggleComplete);
router.put('/', jwtMiddleware, MULTER_UPLOAD.none(), TodoController.updateTodo);

export default router;
