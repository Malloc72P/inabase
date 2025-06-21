'use client';

import { sleep } from '@libs/debug';
import { findShowsApi } from '@libs/fetcher/shows';
import { FindShowsInput } from '@repo/dto';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type UseShowsProps = Omit<FindShowsInput, 'cursor'> & {
  isBottom: boolean;
};

export type ShowsPage = ReturnType<typeof useShows>['data'];

export function useShows({ isBottom, ...params }: UseShowsProps) {
  const qc = useQueryClient();
  const [keyword, setKeyword] = useState(params.keyword || '');

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['shows'],
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
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext
        ? ({
            keyword: lastPage.keyword,
            cursor: lastPage.hasNext ? lastPage.nextCursor : '',
          } as FindShowsInput)
        : null;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setKeyword(params.keyword || '');
  }, [params]);

  return {
    data,
    shows: data?.pages.map((page) => page.shows).flat() || [],
    isInitialLoading: !data && isFetching,
    isShowLoading: isFetching,
    isNextLoading: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
