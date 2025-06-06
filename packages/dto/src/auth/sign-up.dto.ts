import { z } from 'zod';

export const SignUpParamSchema = z
  .object({
    email: z
      .string()
      .email({ message: '유효하지 않은 이메일 형식입니다.' })
      .max(100, { message: '이메일은 최대 100자 이하여야 합니다.' })
      .min(1, { message: '이메일은 필수 입력 항목입니다.' }),
    name: z
      .string()
      .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
      .max(50, { message: '이름은 최대 50자 이하여야 합니다.' })
      .min(1, { message: '이름은 필수 입력 항목입니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .max(100, { message: '비밀번호는 최대 100자 이하여야 합니다.' })
      .min(1, { message: '비밀번호는 필수 입력 항목입니다.' }),
  })
  .strict();
export type SignUpParam = z.infer<typeof SignUpParamSchema>;

export const SignUpResultSchema = z.object({
  result: z.boolean(),
});
export type SignUpResult = z.infer<typeof SignUpResultSchema>;
