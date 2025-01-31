import { ApiError, fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map/api-link-map';
import { SignInParam, SignUpParam } from '@repo/dto';
import { signIn, signOut } from 'next-auth/react';
import { notifyError, notifySuccess } from './use-notification';
import { PageLinkMap } from '@libs/link-map';
import { sleep } from '@libs/debug';

export const useAuth = () => {
  const login = async (param: SignInParam) => {
    const response = await signIn('credentials', {
      ...param,
      redirect: false,
    });

    if (!response || !response.ok) {
      throw new ApiError(
        401,
        'LoginFailed',
        '로그인 실패. 아이디 또는 비밀번호를 다시 확인해주세요.'
      );
    }

    notifySuccess({
      title: 'Success',
      message: '로그인 되었습니다.',
    });
  };

  const logout = async () => {
    try {
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

  const signup = async (dto: SignUpParam) => {
    await fetcher(ApiLinkMap.auth.signup(), {
      method: 'POST',
      body: dto,
    });
  };

  return { login, logout, signup };
};
