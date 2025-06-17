'use client';

import { findShowsApi } from '@libs/fetcher/shows';
import { useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';

export function useShows() {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: queryKey.show.list(),
    queryFn: () => findShowsApi({}),
    initialData: {
      shows: [],
    },
  });

  return {
    shows: data.shows,
    isShowLoading: isLoading,
  };
}
