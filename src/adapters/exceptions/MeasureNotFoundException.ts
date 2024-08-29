import CustomError from './CustomException';

export default class MeasureNotFoundException extends CustomError {
  private readonly _statusCode = 404;

  private readonly _errorCode = 'MEASURE_NOT_FOUND';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, MeasureNotFoundException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
