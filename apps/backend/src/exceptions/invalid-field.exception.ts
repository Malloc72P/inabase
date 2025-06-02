import { FieldError } from '@repo/exceptions';
import { ApiException } from './exception';

export class InvalidFieldException extends ApiException {
  constructor(fieldErrors: FieldError[]) {
    super({
      code: 'InvalidField',
      status: 400,
      message: '유효하지 않은 필드입니다.',
      fieldErrors,
    });
  }
}
