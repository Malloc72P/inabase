import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import { SignInParam, SignInResult, SignUpParam } from '@repo/dto';
import { useSession } from '@libs/stores/session-provider';

export const useAuth = () => {
  const { user, setLoading, updateSession } = useSession();

  //-------------------------------------------------------------------------
  // login
  //-------------------------------------------------------------------------
  const login = async (param: SignInParam) => {
    try {
      setLoading();

      const { profile } = await fetcher<SignInParam, SignInResult>(ApiLinkMap.auth.signin(), {
        method: 'POST',
        body: param,
      });

      updateSession(profile);
    } catch (error) {
      updateSession(null);
      throw error;
    }
  };

  //-------------------------------------------------------------------------
  // logout
  //-------------------------------------------------------------------------
  const logout = async () => {
    try {
      setLoading();

      await fetcher(ApiLinkMap.auth.signout(), {
        method: 'POST',
      });

      updateSession(null);
    } catch (error) {
      // 로그아웃에 실패했다면 이전 상태 복원
      updateSession(user);
      throw error;
    }
  };

  //-------------------------------------------------------------------------
  // signup
  //-------------------------------------------------------------------------
  const signup = async (dto: SignUpParam) => {
    await fetcher(ApiLinkMap.auth.signup(), {
      method: 'POST',
      body: dto,
    });
  };

  return { login, logout, signup };
};
