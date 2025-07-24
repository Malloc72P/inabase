'use client';

import { findShowApi } from '@libs/fetcher/shows/find-show.api';
import { useQuery } from '@tanstack/react-query';

import { QueryKey } from './query-key';

export function useShow(showId: string) {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.show.detail(showId)],
    queryFn: () => findShowApi({ showId }),
    initialData: null,
  });

  return {
    show: data?.show,
    isShowLoading: isLoading,
  };
}
