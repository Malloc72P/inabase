import { TransformFailedException } from '@src/exceptions/transform-failed.exception';
import { ZodTypeAny } from 'zod';

export function transformTo<T>(schema: ZodTypeAny, originObj: unknown): T {
  try {
    return schema.parse(originObj);
  } catch (error) {
    throw new TransformFailedException();
  }
}
