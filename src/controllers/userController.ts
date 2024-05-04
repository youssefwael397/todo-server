import { NextFunction, Request, Response } from 'express';
import { createUserSchema, loginSchema } from '../validations/userSchema.js';
import ValidationError from '../utils/errors/ValidationError.js';
import DuplicateError from '../utils/errors/DuplicateError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import ServerError from '../utils/errors/ServerError.js';
import { Bcrypt } from '../utils/Bcrypt.js';
import CustomError from '../utils/errors/CustomError.js';
import { Jwt } from '../utils/Jwt.js';
import UserModel from '../models/userModel.js';

export class UserController {
  public static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserModel.getAllUsers();
      res.json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  public static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = createUserSchema.validate(req.body, {
        abortEarly: false,
      });
      // validate joi schema first
      if (error) ValidationError.handleValidationError(error, res);

      const { username, email, password } = req.body;
      // check if user's email already exists
      const isDuplicate = await UserModel.checkDuplicateEmail(email);
      if (isDuplicate) throw new DuplicateError('Email already in use');

      // hasing the password to save to db
      const hashed_password = await Bcrypt.hashPassword(password);
      if (!hashed_password)
        throw new ServerError('Unexpected error while creating new user');

      // create a new user
      await UserModel.createUser(username, email, hashed_password);

      // new user created successfully
      res.json({ message: 'User is created successfully' });
    } catch (error) {
      next(error);
    }
  }

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = loginSchema.validate(req.body, {
        abortEarly: false,
      });
      // validate joi schema first
      if (error) ValidationError.handleValidationError(error, res);

      const { email, password } = req.body;

      // find user by email
      const user = await UserModel.getByEmail(email);
      if (!user) throw new CustomError('Bad credentials', 400);

      // check for password validations if user is existing
      const isValid = await Bcrypt.comparePasswords(password, user.password);
      if (!isValid) throw new CustomError('Bad credentials', 400);

      // Generate an access token
      const accessToken = Jwt.generateAccessToken(user);

      // Respond with tokens
      res.json({
        message: 'Login successfully',
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.jwtData.user;
      const user = await UserModel.getUserById(id);
      if (!user) throw new NotFoundError('User Not found');

      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
