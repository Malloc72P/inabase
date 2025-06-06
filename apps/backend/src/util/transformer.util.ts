import { ZodTypeAny } from 'zod';

export function transformTo<T>(schema: ZodTypeAny, originObj: unknown): T {
  return schema.parse(originObj);
}
