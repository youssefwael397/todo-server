export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}


declare global {
  namespace Express {
    interface Request {
      jwtData: { user: User };
    }
  }
}
