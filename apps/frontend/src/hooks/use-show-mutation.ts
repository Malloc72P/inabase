'use client';

import { createShowApi, deleteShowApi, updateShowApi } from '@libs/fetcher/shows';
import { CreateShowInput, UpdateShowInput } from '@repo/dto';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@libs/query-client';
import { useQueryKey } from './use-query-key';

export function useShowMutation() {
  const queryKey = useQueryKey();

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

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async (input: UpdateShowInput & { showId: string }) => {
      const { show } = await updateShowApi(input);

      return show;
    },
    onSuccess: () => {},
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async (showId: string) => {
      await deleteShowApi({ showId });
    },
    onSuccess: () => {},
  });

  return {
    createShow,
    updateShow,
    deleteShow,
  };
}
