'use client';

import { fetcher } from '@libs/fetcher';
import { Api } from '@libs/fetcher/api-url';
import { FindShowsOutput } from '@repo/dto';
import useSWR from 'swr';

export function useShow() {
  const swrObj = useSWR<FindShowsOutput>(Api.shows.list(), fetcher);

  return {
    shows: swrObj.data ? swrObj.data.shows : [],
    isShowLoading: swrObj.isLoading,
    showSwr: swrObj,
  };
}
