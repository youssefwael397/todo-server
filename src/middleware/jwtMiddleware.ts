import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../utils/Jwt.js';
import CustomError from '../utils/errors/CustomError.js';


export function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new CustomError('Authorization header missing', 401));
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token from the "Bearer" token format

  try {
    // Verify the access token using your Jwt class
    const decodedToken = Jwt.verifyAccessToken(token);

    // Add the decoded token data to the request for later use
    req.jwtData = decodedToken;

    next();
  } catch (error) {
    next(new CustomError('Invalid access token', 401));
  }
}
