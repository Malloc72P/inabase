import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { FindShowInput, FindShowOutput } from '@repo/dto';
import { ApiFetcher } from '..';

export const findShowApi: ApiFetcher<FindShowInput & { showId: string }, FindShowOutput> = async (
  { showId, ...param },
  option
) => {
  return fetcher(ApiLinkMap.shows.detail(showId), {
    method: 'GET',
    ...option,
  });
};
