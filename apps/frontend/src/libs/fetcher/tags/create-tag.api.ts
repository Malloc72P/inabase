import { ApiLinkMap } from '@libs/link-map';
import { CreateTagInput, CreateTagOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';
import { fetcher } from '../core/fetcher';

export const createTagApi: ApiFetcher<CreateTagInput, CreateTagOutput> = async (
  body: any,
  option
) => {
  return fetcher(ApiLinkMap.tags.create(), {
    body,
    method: 'POST',
    ...option,
  });
};
