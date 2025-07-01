export const ExceptionCode = {
  Unknown: 'Unknown',
  EmailAlreadyInUse: 'EmailAlreadyInUse',
  LoginFailed: 'LoginFailed',
  AccessTokenExpired: 'AccessTokenExpired',
  InvalidField: 'InvalidField',
  InvalidCredentials: 'InvalidCredentials',
  UserNotFound: 'UserNotFound',
  Unauthorized: 'Unauthorized',
  Forbidden: 'Forbidden',
  InternalServerError: 'InternalServerError',
  TransformFailed: 'TransformFailed',
  ValidationError: 'ValidationError',
  NotFound: 'NotFound',
} as const;

export type ExceptionCode = (typeof ExceptionCode)[keyof typeof ExceptionCode];

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiExceptionPayload {
  code: ExceptionCode;
  status: number;
  message: string;
  fieldErrors?: FieldError[];
}
