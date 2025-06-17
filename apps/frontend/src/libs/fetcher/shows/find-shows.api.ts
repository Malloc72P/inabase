import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { FindShowsInput, FindShowsOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';

export const findShowsApi: ApiFetcher<FindShowsInput, FindShowsOutput> = async (param, option) => {
  return fetcher(ApiLinkMap.shows.list(param), {
    method: 'GET',
    ...option,
  });
};
