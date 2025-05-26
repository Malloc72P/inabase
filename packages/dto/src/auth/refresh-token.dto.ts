import z from 'zod';

export const RefreshTokenParamSchema = z.object({});

export type RefreshTokenParam = z.infer<typeof RefreshTokenParamSchema>;

export const RefreshTokenResultSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  issuedAt: z.number(),
  expiredAt: z.number(),
});

export type RefreshTokenResult = z.infer<typeof RefreshTokenResultSchema>;
