import { PipeTransform } from '@nestjs/common';
import { ZodTypeAny } from 'zod';
import { FieldError } from '@repo/exceptions';
import { InvalidFieldException } from '@src/exceptions/invalid-field.exception';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const fieldErrors: FieldError[] = result.error.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      throw new InvalidFieldException(fieldErrors);
    }
    return result.data;
  }
}
