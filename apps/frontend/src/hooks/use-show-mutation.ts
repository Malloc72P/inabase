'use client';

import { createShowApi, deleteShowApi, updateShowApi } from '@libs/fetcher/shows';
import { CreateShowInput, UpdateShowInput } from '@repo/dto';
import { useMutation } from '@tanstack/react-query';

export function useShowMutation() {
  const { mutateAsync: createShow } = useMutation({
    mutationFn: async (input: CreateShowInput) => {
      const response = await createShowApi(input);

      return response;
    },
  });

  const { mutateAsync: updateShow } = useMutation({
    mutationFn: async (input: UpdateShowInput & { showId: string }) => {
      const { show } = await updateShowApi(input);

      return show;
    },
  });

  const { mutateAsync: deleteShow } = useMutation({
    mutationFn: async (showId: string) => {
      await deleteShowApi({ showId });
    },
  });

  return {
    createShow,
    updateShow,
    deleteShow,
  };
}
