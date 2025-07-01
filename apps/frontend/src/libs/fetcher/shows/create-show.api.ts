import { ApiLinkMap } from '@libs/link-map';
import { CreateShowInput, CreateShowOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';
import { fetcher } from '../core/fetcher';

export const createShowApi: ApiFetcher<CreateShowInput, CreateShowOutput> = async (
  body: any,
  option
) => {
  return fetcher(ApiLinkMap.shows.create(), {
    body,
    method: 'POST',
    ...option,
  });
};
