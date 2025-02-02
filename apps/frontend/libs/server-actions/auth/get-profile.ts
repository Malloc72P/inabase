import { ApiError, fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map';
import { ProfileResult } from '@repo/dto';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession, Session } from 'next-auth';

export async function getProfile(session: Session) {
  const profile = await fetcher<unknown, ProfileResult>(ApiLinkMap.auth.profile.get(), {
    accessToken: session.backendTokens.accessToken,
  });

  return profile;
}
