'use client';

import { fetcher } from '@libs/fetcher';
import { HealthCheckOutput } from '@repo/dto';
import useSWR from 'swr';

export function useHealthCheck() {
  const swrObj = useSWR<HealthCheckOutput>('http://localhost:5050/api/v1/health', fetcher);

  return {
    health: swrObj.data,
    isHealthLoading: swrObj.isLoading,
    healthSwr: swrObj,
  };
}
