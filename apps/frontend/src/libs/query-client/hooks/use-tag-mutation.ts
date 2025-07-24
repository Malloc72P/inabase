import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';
import { createTagApi } from '@libs/fetcher/tags';
import { CreateTagInput } from '@repo/dto';

export const useTagMutation = () => {
  const queryKey = useQueryKey();
  const queryClient = useQueryClient();

  const createTagMutation = useMutation({
    mutationFn: (param: CreateTagInput) => createTagApi(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.tag.list()] });
    },
  });

  return {
    createTag: createTagMutation.mutate,
  };
};
