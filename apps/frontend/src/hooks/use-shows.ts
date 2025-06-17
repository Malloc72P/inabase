'use client';

import { findShowsApi } from '@libs/fetcher/shows';
import { useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';
import { FindShowsInput } from '@repo/dto';
import { useEffect, useState } from 'react';

export function useShows(params: Omit<FindShowsInput, 'cursor'>) {
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState('');
  const queryKey = useQueryKey();

  useEffect(() => {
    setKeyword(params.keyword || '');
  }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: queryKey.show.list({ keyword, cursor }),
    queryFn: async () => {
      const result = await findShowsApi(params);

      setCursor(result.nextCursor);
      setHasNext(result.hasNext);

      return result;
    },
    initialData: {
      shows: [],
      hasNext: false,
      nextCursor: '',
    },
  });

  return {
    shows: data.shows,
    isShowLoading: isLoading,
  };
}
