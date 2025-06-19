import { HttpException } from '@nestjs/common';
import { ApiExceptionPayload, FieldError } from '@repo/exceptions';

export type ApiExceptionProps = ApiExceptionPayload & {
  error?: Error;
};

/**
 * API 예외 클래스
 * 이 클래스는 API 요청 처리 중 발생하는 예외를 나타냅니다.
 * 예외 코드, 상태 코드, 메시지 및 필드 오류를 포함할 수 있습니다
 */
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

  /**
   * 에러 객체를 직렬화하여 JSON 형태로 반환합니다.
   * 이 메서드는 API 응답으로 사용될 수 있는 JSON 객체를 생성합니다
   * @returns ApiExceptionPayload
   */
  toJson(): ApiExceptionPayload {
    const { code, message, status, fieldErrors } = this.getResponse() as ApiExceptionPayload;

    return {
      code,
      message,
      status,
      fieldErrors,
    };
  }
}
