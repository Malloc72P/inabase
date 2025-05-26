import z from 'zod';

export const TokenPayloadSchema = z.object({
  // expired at. jwt가 만료될 시간을 나타낸다.
  exp: z.number(),
  // issued at. jwt가 생성된 시간을 나타낸다
  iat: z.number(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

export const AccessTokenPayloadSchema = z.object({
  id: z.string(),
  email: z.string(),
  isAdmin: z.string(),
});

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;

export const RefreshTokenPayloadSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>;
