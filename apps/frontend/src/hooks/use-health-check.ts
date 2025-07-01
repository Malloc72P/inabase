'use client';

import { HealthCheckOutput } from '@repo/dto';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import { useQueryKey } from './use-query-key';

export function useHealthCheck() {
  const queryKey = useQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: queryKey.health(),
    queryFn: async () => {
      return fetcher<HealthCheckOutput>(ApiLinkMap.health.check());
    },
  });

  return {
    health: data,
    isHealthLoading: isLoading,
  };
}
