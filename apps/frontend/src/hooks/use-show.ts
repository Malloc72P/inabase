'use client';

import { findShowApi } from '@libs/fetcher/shows/find-show.api';
import { useQuery } from '@tanstack/react-query';

import { useQueryKey } from './use-query-key';

export function useShow(showId: string) {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey.show.detail(showId)],
    queryFn: () => findShowApi({ showId }),
    initialData: null,
  });

  return {
    show: data?.show,
    isShowLoading: isLoading,
  };
}
