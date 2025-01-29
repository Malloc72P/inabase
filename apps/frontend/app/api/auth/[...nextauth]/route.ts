import { refreshToken } from '@libs/server-actions/auth';
import { fetcher } from '@libs/fetcher';
import { ApiLinkMap, PageLinkMap } from '@libs/link-map';
import { SignInParam, SignInResult } from '@repo/dto';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const nextAuthOption: NextAuthOptions = {
  pages: {
    signIn: PageLinkMap.auth.login(),
  },
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

        const profile = await fetcher<SignInParam, SignInResult>(ApiLinkMap.auth.signin(), {
          method: 'POST',
          body: {
            email,
            password,
          },
        });

        return profile;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      /**
       * 로그인 후 첫 호출되는 경우, user 객체에 authorize의 리턴값이 넘어온다.
       */
      if (user) {
        return toToken(user as SignInResult);
      }

      /**
       * 두번째 호출부터는 토큰 만료를 검사한다.
       */
      const now = new Date().getTime();
      if (now < token.backendTokens.expiredAt) {
        return token;
      }

      /**
       * 토큰이 만료된 경우 토큰을 리프래시한다.
       */
      const newTokenInfo = await refreshToken({
        refreshToken: token.backendTokens.refreshToken,
      });

      return {
        ...token,
        backendTokens: newTokenInfo,
      };
    },
    async session({ session, token }) {
      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

function toToken(user: SignInResult) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    backendTokens: {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      issuedAt: user.issuedAt,
      expiredAt: user.expiredAt,
    },
  };
}

const handler = NextAuth(nextAuthOption);

export { handler as GET, handler as POST };
