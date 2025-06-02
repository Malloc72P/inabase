export type ExceptionCode =
  | 'Unknown'
  | 'EmailAlreadyInUse'
  | 'LoginFailed'
  | 'AccessTokenExpired'
  | 'InvalidField'
  | 'InvalidCredentials'
  | 'UserNotFound'
  | 'Unauthorized'
  | 'Forbidden'
  | 'InternalServerError';

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
