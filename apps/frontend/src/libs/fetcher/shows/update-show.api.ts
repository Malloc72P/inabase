import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { UpdateShowInput, UpdateShowOutput } from '@repo/dto';

export async function UpdateShowApi(
  showId: string,
  body: UpdateShowInput
): Promise<UpdateShowOutput> {
  return fetcher<UpdateShowInput, UpdateShowOutput>(ApiLinkMap.shows.update(showId), {
    body,
    method: 'PATCH',
  });
}
