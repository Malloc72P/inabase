'use client';

import { findShowsApi } from '@libs/fetcher/shows';
import { useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';
import { FindShowsInput } from '@repo/dto';

export function useShows({ keyword }: FindShowsInput) {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: queryKey.show.list(keyword),
    queryFn: () => findShowsApi({ keyword }),
    initialData: {
      shows: [],
    },
  });

  return {
    shows: data.shows,
    isShowLoading: isLoading,
  };
}
