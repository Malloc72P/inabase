import { HttpException } from '@nestjs/common';
import { ApiExceptionPayload, FieldError } from '@repo/exceptions';

export type ApiExceptionProps = ApiExceptionPayload & {
  error?: Error;
};

export class ApiException extends HttpException {
  originError?: Error;
  fieldErrors: FieldError[];

  constructor({
    code = 'Unknown',
    status = 500,
    message = '알 수 없는 에러가 발생했습니다.',
    error,
    fieldErrors = [],
  }: ApiExceptionProps) {
    const payload: ApiExceptionPayload = {
      code,
      message,
      status,
      fieldErrors,
    };

    super(payload, status);

    if (error) {
      this.originError = error;
    }
  }

  toJson() {
    const { code, message, status, fieldErrors } = this.getResponse() as ApiExceptionPayload;

    return {
      code,
      message,
      status,
      fieldErrors,
    };
  }
}
