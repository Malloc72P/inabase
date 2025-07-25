'use client';

import { findAllTagsApi, findTagsApi } from '@libs/fetcher/tags';
import { FindTagsInput } from '@repo/dto';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './query-key';

export function useAllTags() {
  const { data, isLoading } = useQuery({
    queryKey: QueryKey.tag.all(),
    queryFn: () => findAllTagsApi({}),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    tags: data?.tags || [],
    isTagsLoading: isLoading,
  };
}
