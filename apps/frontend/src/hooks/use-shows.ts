'use client';

import { findShowsApi } from '@libs/fetcher/shows';
import { useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';
import { FindShowsInput, ShowDto } from '@repo/dto';
import { useEffect, useState } from 'react';

export type UseShowsProps = Omit<FindShowsInput, 'cursor'> & {
  isBottom: boolean;
};

export function useShows({ isBottom, ...params }: UseShowsProps) {
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState('');
  const queryKey = useQueryKey();
  const [shows, setShows] = useState<ShowDto[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: queryKey.show.list({ keyword, cursor }),
    queryFn: async () => {
      const result = await findShowsApi({
        keyword,
        cursor,
      });

      setShows((prevShows) => {
        const map = new Map([...prevShows, ...result.shows].map((show) => [show.id, show]));
        const shows = Array.from(map.values());

        return shows;
      });
      setHasNext(result.hasNext);

      return result;
    },
    initialData: {
      shows: [],
      hasNext: false,
      nextCursor: '',
    },
  });

  useEffect(() => {
    setKeyword(params.keyword || '');
  }, [params]);

  useEffect(() => {
    if (!isBottom || !hasNext || isLoading) return;

    setCursor(data.nextCursor);
  }, [isBottom]);

  return {
    shows,
    isShowLoading: isLoading,
  };
}
