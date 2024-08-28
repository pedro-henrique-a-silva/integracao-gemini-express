import CustomError from './CustomException';

export default class InvalidDataException extends CustomError {
  private readonly _statusCode = 400;

  private readonly _errorCode = 'INVALID_DATA';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidDataException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
