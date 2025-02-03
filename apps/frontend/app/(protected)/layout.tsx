import { fetcher } from '@libs/fetcher';
import { ApiLinkMap, PageLinkMap } from '@libs/link-map';
import { CommonConstants } from '@repo/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function MainLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(CommonConstants.token.accessTokenKey)?.value;
  const refreshToken = cookieStore.get(CommonConstants.token.refreshTokenKey)?.value;

  if (!accessToken) {
    return redirect(PageLinkMap.auth.login());
  }

  console.log('refreshToken', refreshToken);

  try {
    const profile = await fetcher(ApiLinkMap.auth.profile.get(), {
      accessToken,
      refreshToken,
    });

    console.log(profile);
  } catch (error) {
    console.error(error);
    return redirect(PageLinkMap.auth.login());
  }
  return <>{children}</>;
}
