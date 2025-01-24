import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map';
import { SignInParam, SignInResult } from '@repo/dto';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialProvider({
      name: 'local',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, request) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const { accessToken, refreshToken, ...profile } = await fetcher<SignInParam, SignInResult>(
          ApiLinkMap.auth.signin(),
          {
            method: 'POST',
            body: {
              email,
              password,
            },
          }
        );

        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: '',
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const signInUser = user as SignInResult;

        return {
          id: signInUser.id,
          name: signInUser.name,
          email: signInUser.email,
          backendTokens: {
            accessToken: signInUser.accessToken,
            refreshToken: signInUser.refreshToken,
          },
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
