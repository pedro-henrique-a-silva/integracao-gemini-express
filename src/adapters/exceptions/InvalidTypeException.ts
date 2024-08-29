import CustomError from './CustomException';

export default class InvalidTypeException extends CustomError {
  private readonly _statusCode = 400;

  private readonly _errorCode = 'INVALID_TYPE';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidTypeException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
