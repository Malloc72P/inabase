import { ApiLinkMap } from '@libs/link-map';
import { fetcher } from '../core/fetcher';
import { CreateShowInput, CreateShowOutput, FindShowsInput, FindShowsOutput } from '@repo/dto';

export async function createShowApi(body: CreateShowInput): Promise<CreateShowOutput> {
  return fetcher<CreateShowInput, CreateShowOutput>(ApiLinkMap.shows.create(), {
    body,
    method: 'POST',
  });
}
