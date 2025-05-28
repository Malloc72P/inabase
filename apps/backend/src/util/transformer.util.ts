import { ClassConstructor, plainToInstance } from 'class-transformer';
import { z, ZodSchema } from 'zod';

export function transformTo<T, V>(cls: ClassConstructor<T>, originObj: V): T {
  return plainToInstance(cls, originObj, { excludeExtraneousValues: true });
}

export function transformTo2<T>(zodObject: ZodSchema<T>, object: any) {
  return zodObject.parse(object) as T;
}
