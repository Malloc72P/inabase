'use client';

import { fetcher } from 'src/libs/fetcher';
import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import { HealthCheckOutput } from '@repo/dto';
import useSWR from 'swr';

export function useHealthCheck() {
  const swrObj = useSWR<HealthCheckOutput>(ApiLinkMap.health.check(), fetcher);

  return {
    health: swrObj.data,
    isHealthLoading: swrObj.isLoading,
    healthSwr: swrObj,
  };
}
