import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { UpdateShowInput, UpdateShowOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';

export const updateShowApi: ApiFetcher<
  UpdateShowInput & { showId: string },
  UpdateShowOutput
> = async ({ showId, ...body }, option) => {
  return fetcher(ApiLinkMap.shows.update(showId), {
    body,
    method: 'PATCH',
    ...option,
  });
};
