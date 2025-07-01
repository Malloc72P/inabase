import { FieldError } from '@repo/exceptions';
import { ApiException } from './exception';

export class TransformFailedException extends ApiException {
  constructor() {
    super({
      code: 'TransformFailed',
      status: 500,
      message: '서버에 문제가 발생했습니다. 다시 시도해주세요.',
    });
  }
}
