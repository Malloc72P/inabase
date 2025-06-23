'use client';

import { createShowApi, deleteShowApi, updateShowApi } from '@libs/fetcher/shows';
import { CreateShowInput, ShowDto, UpdateShowInput } from '@repo/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShowsPage } from './use-shows';
import { useQueryKey } from './use-query-key';

export function useShowMutation() {
  const queryKey = useQueryKey();
  const queryClient = useQueryClient();

  const { mutateAsync: createShow } = useMutation({
    mutationFn: async (input: CreateShowInput) => {
      const response = await createShowApi(input);

      return response;
    },
  });

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async (input: UpdateShowInput & { showId: string }) => {
      const { show: updatedShow } = await updateShowApi(input);

      updateCache((shows) =>
        shows.map((prevShow) => (prevShow.id === updatedShow.id ? updatedShow : prevShow))
      );

      return updatedShow;
    },
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async (showId: string) => {
      await deleteShowApi({ showId });

      updateCache((shows) => shows.filter((show) => show.id !== showId));
    },
  });

  function updateCache(nextShowsFn: (prev: ShowDto[]) => ShowDto[]) {
    const queries = queryClient
      .getQueryCache()
      .findAll({ queryKey: queryKey.show.list({ keyword: '' }), exact: false });

    queries.forEach(({ queryKey }) => {
      queryClient.setQueriesData({ queryKey }, (oldData: ShowsPage) => {
        if (!oldData) return oldData;

        // infinite query 데이터 업데이트 로직
        const nextData = {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            shows: nextShowsFn(page.shows),
          })),
        };

        return nextData;
      });
    });
  }

  return {
    createShow,
    updateShow,
    deleteShow,
  };
}
