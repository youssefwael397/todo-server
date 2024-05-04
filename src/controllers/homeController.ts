import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/errors/CustomError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

export class HomeController {
  public static helloWorld(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let user = {
      haram: undefined,
    };
    res.json({ success: true, message: 'Hello World!' });
  }
}

