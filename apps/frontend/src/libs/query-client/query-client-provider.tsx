'use client';

import { PropsWithChildren } from 'react';
import { queryClient } from './query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export interface QueryClientProviderProps extends PropsWithChildren {}

export function ReactQueryProvider({ children }: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
