import z from 'zod';

export const SignInParamSchema = z.object({
  email: z
    .string({ message: 'email은 문자열이어야 합니다.' })
    .nonempty({ message: 'email은 비어 있을 수 없습니다.' }),
  password: z
    .string({ message: 'password은 문자열이어야 합니다.' })
    .nonempty({ message: 'password은 비어 있을 수 없습니다.' }),
});

export type SignInParam = z.infer<typeof SignInParamSchema>;

export const SignInResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  accessToken: z.string(),
  refreshToken: z.string(),
  issuedAt: z.number(),
  expiredAt: z.number(),
});

export type SignInResult = z.infer<typeof SignInResultSchema>;
