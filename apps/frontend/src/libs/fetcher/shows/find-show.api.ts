import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { FindShowInput, FindShowOutput } from '@repo/dto';

export async function findShowApi(showId: string): Promise<FindShowOutput> {
  return fetcher<FindShowInput, FindShowOutput>(ApiLinkMap.shows.detail(showId));
}
