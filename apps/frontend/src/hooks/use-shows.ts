'use client';

import { findShowsApi } from '@libs/fetcher/shows';
import { FindShowsInput, FindShowsOutput } from '@repo/dto';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useQueryKey } from './use-query-key';
import { sleep } from '@libs/debug';

export type UseShowsProps = Omit<FindShowsInput, 'cursor'> & {};
export type ShowsQueryData = InfiniteData<FindShowsOutput>;
export type ShowsQueryPage = ShowsQueryData['pages'];

export function useShows({ ...params }: UseShowsProps) {
  const qKey = useQueryKey();
  const showsKey = useMemo(() => {
    return qKey.show.list(params);
  }, [params]);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: showsKey,
    queryFn: async (param) => {
      const result = await findShowsApi({
        keyword: param.pageParam.keyword || '',
        cursor: param.pageParam.cursor || '',
      });

      return result;
    },
    initialPageParam: {
      keyword: params.keyword || '',
      cursor: '',
    } as FindShowsInput,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext
        ? ({
            keyword: lastPage.keyword,
            cursor: lastPage.hasNext ? lastPage.nextCursor : '',
          } as FindShowsInput)
        : null;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    data,
    showsKey,
    shows: data?.pages.map((page) => page.shows).flat() || [],
    isInitialLoading: !data && isFetching,
    isShowLoading: isFetching,
    isNextLoading: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
