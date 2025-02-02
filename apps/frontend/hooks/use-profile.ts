import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map';
import { UpdateProfileInput, UpdateProfileOutput } from '@repo/dto';
import { Session } from 'next-auth';

export function useProfile() {
  const updateProfile = async ({
    id,
    name,
    session,
  }: { session: Session; id: string } & UpdateProfileInput) => {
    return await fetcher<UpdateProfileInput, UpdateProfileOutput>(
      ApiLinkMap.auth.profile.update(id),
      {
        body: {
          name,
        },
        method: 'PATCH',
        accessToken: session.backendTokens.accessToken,
      }
    );
  };

  return { updateProfile };
}
