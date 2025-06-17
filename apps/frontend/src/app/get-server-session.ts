import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map';
import { SessionProps } from '@libs/stores/session-store';
import { CommonConstants, ProfileResult } from '@repo/dto';
import { cookies } from 'next/headers';

export async function getServerSession(): Promise<SessionProps> {
  const unauthenticatedState: SessionProps = {
    state: 'unauthenticated',
    user: null,
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(CommonConstants.token.accessTokenKey)?.value;
  const refreshToken = cookieStore.get(CommonConstants.token.refreshTokenKey)?.value;

  if (!accessToken) {
    return unauthenticatedState;
  }

  let profile: ProfileResult | null = null;

  try {
    profile = await fetcher<unknown, ProfileResult>(ApiLinkMap.auth.profile.get(), {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return unauthenticatedState;
  }

  if (!profile) {
    return unauthenticatedState;
  }

  return {
    user: profile,
    state: 'authenticated',
  };
}

export async function getTokens() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(CommonConstants.token.accessTokenKey)?.value;
  const refreshToken = cookieStore.get(CommonConstants.token.refreshTokenKey)?.value;

  return {
    accessToken,
    refreshToken,
  };
}
