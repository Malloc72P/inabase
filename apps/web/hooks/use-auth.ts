import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map/api-link-map';
import { SignInParam, SignInResult } from '@repo/dto';

export const useAuth = () => {
  const login = async (param: SignInParam) => {
    const response = await fetcher<SignInParam, SignInResult>(ApiLinkMap.auth.signin(), {
      method: 'POST',
      body: param,
    });

    console.log(response);
  };

  return { login };
};
