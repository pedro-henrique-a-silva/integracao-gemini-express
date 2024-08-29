import CustomError from './CustomException';

export default class MeasuresNotFoundException extends CustomError {
  private readonly _statusCode = 404;

  private readonly _errorCode = 'MEASURES_NOT_FOUND';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, MeasuresNotFoundException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
