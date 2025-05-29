import { ProfileProvider } from '@components/auth-session-provider';
import { CommonConstants, ProfileResult } from '@repo/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap, PageLinkMap } from 'src/libs/link-map';

export default async function MainLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(CommonConstants.token.accessTokenKey)?.value;
  const refreshToken = cookieStore.get(CommonConstants.token.refreshTokenKey)?.value;

  if (!accessToken) {
    return redirect(PageLinkMap.auth.login());
  }

  let profile: ProfileResult | null = null;

  try {
    profile = await fetcher<unknown, ProfileResult>(ApiLinkMap.auth.profile.get(), {
      accessToken,
      refreshToken,
    });
  } catch (error) {}

  if (!profile) {
    redirect(PageLinkMap.auth.login());
  }

  return <ProfileProvider initialProfile={profile}>{children}</ProfileProvider>;
}
