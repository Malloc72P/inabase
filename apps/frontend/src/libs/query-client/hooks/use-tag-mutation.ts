import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from './query-key';
import { createTagApi, deleteTagApi, updateTagApi } from '@libs/fetcher/tags';
import { CommonConstants, CreateTagInput, DeleteTagInput, UpdateTagInput } from '@repo/dto';

export const useTagMutation = () => {
  const queryClient = useQueryClient();

  const createTagMutation = useMutation({
    mutationFn: (param: CreateTagInput) => createTagApi(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.tag.listKey] });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: (param: UpdateTagInput & { tagId: string }) => updateTagApi(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.tag.listKey] });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: (param: DeleteTagInput & { tagId: string }) => deleteTagApi(param),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.tag.listKey],
      });
    },
  });

  return {
    createTag: createTagMutation.mutateAsync,
    updateTag: updateTagMutation.mutateAsync,
    deleteTag: deleteTagMutation.mutateAsync,
  };
};
