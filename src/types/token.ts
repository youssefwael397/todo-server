export default interface IToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
}