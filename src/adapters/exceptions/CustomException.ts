export default abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  abstract readonly errorCode: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
