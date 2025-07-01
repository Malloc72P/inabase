import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { DeleteShowInput, DeleteShowOutput, FindShowsInput, FindShowsOutput } from '@repo/dto';
import { ApiFetcher } from '..';

export const deleteShowApi: ApiFetcher<
  DeleteShowInput & { showId: string },
  DeleteShowOutput
> = async ({ showId, ...body }, option) => {
  return fetcher(ApiLinkMap.shows.delete(showId), {
    body,
    method: 'DELETE',
    ...option,
  });
};
