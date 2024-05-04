import { PrismaClient } from '@prisma/client';
import ServerError from '../utils/errors/ServerError.js';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const prisma = new PrismaClient();

export class TodoModel {
  static async createTodo(title: string, userId: number) {
    return await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
  }

  static async getAllTodos() {
    return await prisma.todo.findMany();
  }

  static async getTodoById(id: number) {
    return await prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  static async getTodosByUserId(userId: number) {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  static async updateTodo(newTodo: Todo) {
    return await prisma.todo.update({
      where: {
        id: newTodo.id,
      },
      data: newTodo,
    });
  }

  static async updatePartialTodo(id: number, data: Partial<Todo>) {
    return await prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteTodo(id: number) {
    try {
      return await prisma.todo.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ServerError();
    }
  }
}
