import CustomError from './CustomException';

export default class ConfirmationDuplicatedException extends CustomError {
  private readonly _statusCode = 404;

  private readonly _errorCode = 'CONFIRMATION_DUPLICATE';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConfirmationDuplicatedException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
