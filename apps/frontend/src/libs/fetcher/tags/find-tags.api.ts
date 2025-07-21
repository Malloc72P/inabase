import { ApiLinkMap } from '@libs/link-map';
import { FindTagsInput, FindTagsOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';
import { fetcher } from '../core/fetcher';

export const findTagsApi: ApiFetcher<FindTagsInput, FindTagsOutput> = async (param, option) => {
  return fetcher(ApiLinkMap.tags.list(param), {
    method: 'GET',
    ...option,
  });
};
