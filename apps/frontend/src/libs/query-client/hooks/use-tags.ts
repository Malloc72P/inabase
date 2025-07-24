'use client';

import { findTagsApi } from '@libs/fetcher/tags';
import { FindTagsInput } from '@repo/dto';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './query-key';

export function useTags(param: FindTagsInput) {
  const { data, isLoading } = useQuery({
    queryKey: QueryKey.tag.list(param),
    queryFn: () => findTagsApi(param),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    tags: data?.tags || [],
    isTagsLoading: isLoading,
  };
}
