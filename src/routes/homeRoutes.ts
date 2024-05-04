import { Router } from 'express';
import { HomeController } from '../controllers/homeController.js';

const router = Router();

router.get('/', HomeController.helloWorld);


export default router;
