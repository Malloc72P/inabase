export type ExceptionCode = 'Unknown' | 'EmailAlreadyInUse';

export interface ApiExceptionPayload {
  code: ExceptionCode;
  status: number;
  message: string;
}
