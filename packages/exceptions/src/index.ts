export type ExceptionCode = 'Unknown' | 'EmailAlreadyInUse' | 'LoginFailed' | 'TokenExpired';

export interface ApiExceptionPayload {
  code: ExceptionCode;
  status: number;
  message: string;
}
