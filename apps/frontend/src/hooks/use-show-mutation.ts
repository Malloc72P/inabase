'use client';

import { createShowApi, deleteShowApi, updateShowApi } from '@libs/fetcher/shows';
import { CreateShowInput, UpdateShowInput } from '@repo/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryClient } from '@libs/query-client';
import { useQueryKey } from './use-query-key';
import { ShowsPage } from './use-shows';

export function useShowMutation() {
  const qc = useQueryClient();
  const queryKey = useQueryKey();

  const { mutateAsync: createShow } = useMutation({
    mutationFn: async (input: CreateShowInput) => {
      const response = await createShowApi(input);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.show.list({ keyword: '', cursor: '' }),
      });
    },
  });

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async (input: UpdateShowInput & { showId: string }) => {
      const { show } = await updateShowApi(input);

      return show;
    },
    onSuccess: () => {},
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async (showId: string) => {
      await qc.cancelQueries({ queryKey: ['shows'] });
      const prev = qc.getQueryData<ShowsPage>;

      qc.setQueryData<ShowsPage>(['shows'], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            shows: page.shows.filter((show) => show.id !== showId),
          })),
        };
      });

      await deleteShowApi({ showId });

      return { prev };
    },
    onError: (err, id, ctx) => {
      const context = ctx as { prev: ShowsPage };

      if (context?.prev) {
        qc.setQueryData(['shows'], context.prev);
      }
    },
  });

  return {
    createShow,
    updateShow,
    deleteShow,
  };
}
