'use client';

import { useHealthCheck } from '@hooks/useHealthCheck';
import { HealthCheckResponse } from '@repo/dto';
import { Loader, Text } from '@mantine/core';

export default function Home() {
  const { data, isLoading } = useHealthCheck();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text size="xl">{data?.statusCode}</Text>
          <Text fw="bolder">{data?.serverAddr}</Text>
        </>
      )}
    </div>
  );
}
