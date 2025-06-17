'use client';

import { createShowApi, deleteShowApi, findShowsApi, updateShowApi } from '@libs/fetcher/shows';

import { CreateShowInput, UpdateShowInput } from '@repo/dto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';
import { queryClient } from '@libs/query-client';

export function useShows() {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: queryKey.show.list(),
    queryFn: () => findShowsApi(),
    initialData: {
      shows: [],
    },
  });

  const { mutateAsync: createShow } = useMutation({
    mutationFn: async (input: CreateShowInput) => {
      const response = await createShowApi(input);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.show.list(),
      });
    },
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async (showId: string) => {
      await deleteShowApi(showId);

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.show.list(),
      });
    },
  });

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async ({ showId, ...input }: UpdateShowInput & { showId: string }) => {
      const { show } = await updateShowApi(showId, input);

      return show;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.show.list(),
      });
    },
  });

  return {
    shows: data.shows,
    isShowLoading: isLoading,
    createShow,
    updateShow,
    deleteShow,
  };
}
