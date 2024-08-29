import CustomError from './CustomException';

export default class DoubleReportException extends CustomError {
  private readonly _statusCode = 409;

  private readonly _errorCode = 'DOUBLE_REPORT';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DoubleReportException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
