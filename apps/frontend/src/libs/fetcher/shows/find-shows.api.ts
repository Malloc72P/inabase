import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { FindShowsInput, FindShowsOutput } from '@repo/dto';

export async function findShowsApi(params: FindShowsInput = {}): Promise<FindShowsOutput> {
  return fetcher<FindShowsInput, FindShowsOutput>(ApiLinkMap.shows.list());
}
