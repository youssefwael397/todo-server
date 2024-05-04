import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import CustomError from './errors/CustomError.js';
import { User } from '../types/types.js';

dotenv.config();

export class Jwt {
  private static ACCESS_TOKEN_KEY: Secret =
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY || 'hard-coded-secret';

  public static generateAccessToken(user: User): string {
    const accessToken = jwt.sign(
      { user: user },
      Jwt.ACCESS_TOKEN_KEY,
      { expiresIn: '30d' } // Set the expiration time for the access token
    );
    return accessToken;
  }

  public static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, Jwt.ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new CustomError('Invalid access token', 401);
    }
  }

  public static decrypt(token: string): any {
    try {
      const decodedToken = jwt.verify(token, Jwt.ACCESS_TOKEN_KEY);
      console.log("🚀 ~ Jwt ~ decrypt ~ decodedToken:", decodedToken)
      return decodedToken;
    } catch (error) {
      throw new CustomError('Failed to decrypt token', 401);
    }
  }
}
