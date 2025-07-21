'use client';

import { findTagsApi } from '@libs/fetcher/tags';
import { FindTagsInput } from '@repo/dto';
import { useQuery } from '@tanstack/react-query';
import { useQueryKey } from './use-query-key';

export function useTags(param: FindTagsInput) {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey.tag.list(param)],
    queryFn: () => findTagsApi(param),
    initialData: null,
  });

  return {
    tags: data?.tags || [],
    isTagsLoading: isLoading,
  };
}
