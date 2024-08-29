export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  'INVALID_DATA'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNABLE_TO_PROCESS';

type ServiceResponseSuccessType = 'SUCCESSFUL' | 'CREATED' | 'NO_CONTENT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
