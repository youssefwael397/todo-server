import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import homeRoutes from './routes/homeRoutes.js'
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());


// routes
app.use('/', homeRoutes);
app.use('/api', userRoutes);
app.use('/api/todos', todoRoutes);

// middlewares
app.use(errorMiddleware);
// Middleware to handle CORS
app.use(cors());
// Middleware to parse JSON request body
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});
