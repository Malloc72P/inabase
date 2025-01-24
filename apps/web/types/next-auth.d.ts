import { ProfileResult, SignInResult } from '@repo/dto';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

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
