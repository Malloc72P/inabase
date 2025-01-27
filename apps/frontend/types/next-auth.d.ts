import { ProfileResult, SignInResult } from '@repo/dto';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

export interface BackendTokens {
  accessToken: string;
  refreshToken: string;
  issuedAt: number;
  expiredAt: number;
}

declare module 'next-auth' {
  interface Session {
    id: string;
    name: string;
    email: string;
    backendTokens: BackendTokens;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    backendTokens: BackendTokens;
  }
}
