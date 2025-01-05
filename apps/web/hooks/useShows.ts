'use client';

import { fetcher } from '@libs/fetcher';
import { FindShowsOutput } from '@repo/dto';
import useSWR from 'swr';

export function useShow() {
  const swrObj = useSWR<FindShowsOutput>('http://localhost:5050/api/v1/shows', fetcher);

  return {
    shows: swrObj.data ? swrObj.data.shows : [],
    isShowLoading: swrObj.isLoading,
    showSwr: swrObj,
  };
}
