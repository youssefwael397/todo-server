import * as bcrypt from 'bcrypt';

export class Bcrypt {
  private static saltRounds = 10;

  public static hashPassword(password: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, Bcrypt.saltRounds, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          resolve(undefined);
        } else {
          console.log('hashed password:', hash);
          resolve(hash);
        }
      });
    });
  }

  public static comparePasswords(
    password: string,
    saved_password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, saved_password);
  }
}
