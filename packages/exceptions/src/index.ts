export type ExceptionCode = 'Unknown' | 'EmailAlreadyInUse' | 'LoginFailed';

export interface ApiExceptionPayload {
  code: ExceptionCode;
  status: number;
  message: string;
}
