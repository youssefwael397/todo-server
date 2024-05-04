import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserModel {
  static async createUser(username: string, email: string, password: string) {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  static async getAllUsers() {
    return await prisma.user.findMany();
  }

  static async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async updateUser(id: number, data: Partial<any>) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteUser(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  static async checkDuplicateEmail(email: string) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!existingUser;
  }
}
