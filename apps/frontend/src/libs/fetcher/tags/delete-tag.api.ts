import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { DeleteTagInput, DeleteTagOutput, FindTagsInput, FindTagsOutput } from '@repo/dto';
import { ApiFetcher } from '..';

export const deleteTagApi: ApiFetcher<DeleteTagInput & { tagId: string }, DeleteTagOutput> = async (
  { tagId, ...body },
  option
) => {
  return fetcher(ApiLinkMap.tags.delete(tagId), {
    body,
    method: 'DELETE',
    ...option,
  });
};
