import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { MULTER_UPLOAD } from '../utils/multerSetup.js';
import { jwtMiddleware } from '../middleware/jwtMiddleware.js';

const router = Router();

// Define routes and connect them to controller methods
router.post('/register', MULTER_UPLOAD.none(), UserController.createUser);
router.post('/login', MULTER_UPLOAD.none(), UserController.login);

export default router;
