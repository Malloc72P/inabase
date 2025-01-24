import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map/api-link-map';
import { ProfileResult, SignInParam, SignInResult } from '@repo/dto';
import useSWR from 'swr';
import { notifyError, notifySuccess } from './use-notification';

export const useAuth = () => {
  const { data: profile, isLoading: isProfileLoading } = useSWR<ProfileResult>(
    ApiLinkMap.auth.profile(),
    fetcher
  );

  const login = async (param: SignInParam) => {
    try {
      await fetcher<SignInParam, SignInResult>(ApiLinkMap.auth.signin(), {
        method: 'POST',
        body: param,
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

  return { login, logout, profile, isProfileLoading, isAuthed: !!profile };
};
