import { UpdateProfileInput, UpdateProfileOutput } from '@repo/dto';
import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap } from 'src/libs/link-map';

export function useProfile() {
  const updateProfile = async ({ id, name }: { id: string } & UpdateProfileInput) => {
    return await fetcher<UpdateProfileInput, UpdateProfileOutput>(
      ApiLinkMap.auth.profile.update(id),
      {
        body: {
          name,
        },
        method: 'PATCH',
      }
    );
  };

  return { updateProfile };
}
