import { z } from 'zod';
import { ProfileResultSchema } from './profile.dto';

export const SignInParamSchema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();
export type SignInParam = z.infer<typeof SignInParamSchema>;

export const SignInResultSchema = z
  .object({
    profile: ProfileResultSchema,
    accessToken: z.string(),
    refreshToken: z.string(),
    issuedAt: z.number(),
    expiredAt: z.number(),
  });
export type SignInResult = z.infer<typeof SignInResultSchema>;
