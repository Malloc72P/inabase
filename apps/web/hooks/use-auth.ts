import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map/api-link-map';
import { SignInParam } from '@repo/dto';
import { signIn, signOut } from 'next-auth/react';
import { notifyError, notifySuccess } from './use-notification';

export const useAuth = () => {
  const login = async (param: SignInParam) => {
    try {
      await signIn('credentials', {
        ...param,
        redirect: true,
        callbackUrl: '/',
      });

      notifySuccess({
        title: 'Success',
        message: '로그인 되었습니다.',
      });
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await fetcher(ApiLinkMap.auth.signout(), {
        method: 'POST',
      });

      await signOut({ redirect: true, callbackUrl: '/login' });

      notifySuccess({
        title: 'Success',
        message: '로그아웃 되었습니다.',
      });
    } catch (error) {
      notifyError({
        title: 'Error',
        message: (error as Error)?.message,
      });
    }
  };

  return { login, logout };
};
