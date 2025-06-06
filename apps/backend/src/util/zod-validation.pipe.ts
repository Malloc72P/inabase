import { PipeTransform, UsePipes } from '@nestjs/common';
import { ZodTypeAny } from 'zod';
import { FieldError } from '@repo/exceptions';
import { InvalidFieldException } from '@src/exceptions/invalid-field.exception';

/**
 * ZodValidationPipe는 Zod 스키마를 사용하여 입력 데이터를 검증하는 NestJS 파이프입니다.
 * 유효하지 않은 데이터가 들어올 경우 InvalidFieldException을 발생시킵니다.
 * @example
 * ```typescript
 * import { ZodValidationPipe } from '@src/util/zod-validation.pipe';
 * import { z } from 'zod';
 * const schema = z.object({
 *   name: z.string().min(1),
 *   age: z.number().int().positive(),
 * });
 * @Controller('users')
 * export class UsersController {
 *   @Post()
 *   createUser(@Body(new ZodValidationPipe(schema)) userData: z.infer<typeof schema>) {
 *     // userData는 이제 유효한 데이터입니다.
 *     return this.userService.create(userData);
 *  }
 * }
 * * @throws InvalidFieldException - 유효하지 않은 필드가 있을 경우 발생합니다.
 */
class ZodValidationPipe implements PipeTransform {
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

export const ZodInput = (schema: ZodTypeAny) => UsePipes(new ZodValidationPipe(schema));
