class CustomError extends Error {
  statusCode: number;
  constructor(message: any, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export default CustomError;
