'use client';

import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import { CreateShowInput, CreateShowOutput, FindShowsOutput } from '@repo/dto';
import useSWR from 'swr';
import { toApiError } from '@libs/fetcher/fetcher-util';

export function useShow() {
  const swrObj = useSWR<FindShowsOutput>(ApiLinkMap.shows.list(), fetcher);

  const createShow = async (param: CreateShowInput) => {
    const response = await fetcher<CreateShowOutput>(ApiLinkMap.shows.create(), {
      method: 'POST',
      body: JSON.stringify(param),
    });

    swrObj.mutate(
      (data) => ({
        shows: [...(data?.shows || []), response.show],
      }),
      false
    );

    return response;
  };

  return {
    shows: swrObj.data ? swrObj.data.shows : [],
    isShowLoading: swrObj.isLoading,
    showSwr: swrObj,
    createShow,
  };
}
