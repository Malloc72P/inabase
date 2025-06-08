import { FieldError } from '@repo/exceptions';
import { ApiException } from './exception';

export class EntityNotFound extends ApiException {
  constructor(message?: string) {
    super({
      code: 'NotFound',
      status: 400,
      message,
    });
  }
}
