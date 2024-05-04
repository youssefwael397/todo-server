import { NextFunction, Request, Response } from 'express';
import { Todo, TodoModel } from '../models/todoModel.js';
import { createTodoSchema } from '../validations/todoSchema.js';
import ValidationError from '../utils/errors/ValidationError.js';

export class TodoController {
  public static async getAllTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const todos: Todo[] = await TodoModel.getAllTodos();
      res.json({ data: todos });
    } catch (error) {
      next(error);
    }
  }

  public static async createTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.jwtData.user.id;

      const { title } = req.body;

      const payload = { userId, title };

      const { error } = createTodoSchema.validate(payload, {
        abortEarly: false,
      });
      // validate joi schema first
      if (error) ValidationError.handleValidationError(error, res);

      const todo = await TodoModel.createTodo(title, userId);
      res.json({ message: 'Todo created successfully', data: todo });
    } catch (error) {
      next(error);
    }
  }

  public static async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { todo } = req.body;
      const updated_todo = await TodoModel.updateTodo(todo);
      res.json({ message: 'Todo updated successfully', data: updated_todo });
    } catch (error) {
      next(error);
    }
  }

  public static async getTodosById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const todo = await TodoModel.getTodoById(Number(id));
      res.json({ data: todo });
    } catch (error) {
      next(error);
    }
  }

  public static async getTodosByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.jwtData.user.id;
      const todos = await TodoModel.getTodosByUserId(Number(id));

      res.json({ data: todos });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { todoId } = req.params;

      await TodoModel.deleteTodo(Number(todoId));
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  public static async toggleComplete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { todoId } = req.params;
      const todo = await TodoModel.getTodoById(Number(todoId));

      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }

      const updatedTodo = await TodoModel.updatePartialTodo(Number(todoId), {
        ...todo,
        completed: !todo.completed,
      });
      res.json({
        message: `Todo marked as ${
          todo.completed ? 'Uncompleted' : 'Completed'
        }`,
        data: updatedTodo,
      });
    } catch (error) {
      next(error);
    }
  }
}
