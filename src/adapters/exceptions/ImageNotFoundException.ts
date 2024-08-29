import CustomError from './CustomException';

export default class ImageNotFoundException extends CustomError {
  private readonly _statusCode = 404;

  private readonly _errorCode = 'IMAGE_NOT_FOUND';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ImageNotFoundException.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }
}
