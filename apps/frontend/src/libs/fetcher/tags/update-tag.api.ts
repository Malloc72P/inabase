import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { UpdateTagInput, UpdateTagOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';

export const updateTagApi: ApiFetcher<UpdateTagInput & { tagId: string }, UpdateTagOutput> = async (
  { tagId, ...body },
  option
) => {
  return fetcher(ApiLinkMap.tags.update(tagId), {
    body,
    method: 'PATCH',
    ...option,
  });
};
