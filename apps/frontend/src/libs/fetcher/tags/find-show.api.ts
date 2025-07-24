import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { FindTagInput, FindTagOutput } from '@repo/dto';
import { ApiFetcher } from '..';
import { getServerSession } from 'src/app/get-server-session';

export const findTagApi: ApiFetcher<FindTagInput & { tagId: string }, FindTagOutput> = async (
  { tagId, ...param },
  option
) => {
  return fetcher(ApiLinkMap.tags.detail(tagId), {
    method: 'GET',
    ...option,
  });
};
