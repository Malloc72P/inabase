import { fetcher } from '@libs/fetcher';
import { ApiLinkMap } from '@libs/link-map';
import { RefreshTokenResult } from '@repo/dto';

export async function refreshToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<RefreshTokenResult> {
  return await fetcher<RefreshTokenResult>(ApiLinkMap.auth.refresh(), {
    method: 'POST',
    refreshToken,
  });
}
