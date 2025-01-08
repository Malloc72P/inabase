'use client';

import { Env } from '@libs/env';
import { fetcher } from '@libs/fetcher';
import { Api } from '@libs/fetcher/api-url';
import { HealthCheckOutput } from '@repo/dto';
import useSWR from 'swr';

export function useHealthCheck() {
  const swrObj = useSWR<HealthCheckOutput>(Api.health.check(), fetcher);

  return {
    health: swrObj.data,
    isHealthLoading: swrObj.isLoading,
    healthSwr: swrObj,
  };
}
