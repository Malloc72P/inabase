'use client';

import { deleteShowApi, updateShowApi } from '@libs/fetcher/shows';
import { findShowApi } from '@libs/fetcher/shows/find-show.api';
import { UpdateShowInput } from '@repo/dto';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useQueryKey } from './use-query-key';

export function useShow(showId: string) {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey.show.detail(showId)],
    queryFn: () => findShowApi(showId),
    initialData: null,
  });

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async (input: UpdateShowInput) => {
      const { show } = await updateShowApi(showId, input);

      return show;
    },
    onSuccess: () => {},
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async () => {
      await deleteShowApi(showId);
    },
    onSuccess: () => {},
  });

  return {
    show: data?.show,
    isShowLoading: isLoading,
    updateShow,
    deleteShow,
  };
}
