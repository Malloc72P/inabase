import { ApiLinkMap } from '@libs/link-map';
import { CommonConstants, FindTagsInput, FindTagsOutput } from '@repo/dto';
import { ApiFetcher } from '../core/api-fetcher';
import { fetcher } from '../core/fetcher';

export const findAllTagsApi: ApiFetcher<{}, FindTagsOutput> = async (_, option) => {
  return fetcher(
    ApiLinkMap.tags.list({
      pageIndex: 0,
      pageSize: CommonConstants.paging.tag.pageSizeXl,
    }),
    {
      method: 'GET',
      ...option,
    }
  );
};
