import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { DeleteShowInput, DeleteShowOutput, FindShowsInput, FindShowsOutput } from '@repo/dto';

export async function deleteShowApi(
  showId: string,
  body: DeleteShowInput = {}
): Promise<DeleteShowOutput> {
  return fetcher<DeleteShowInput, DeleteShowOutput>(ApiLinkMap.shows.delete(showId), {
    body,
    method: 'DELETE',
  });
}
