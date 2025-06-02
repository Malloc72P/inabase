'use client';

import { Box, Flex, Loader, LoadingOverlay, Text } from '@mantine/core';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  use,
  useRef,
  useState,
} from 'react';
import { useGlobalLoadingStore } from './loading-store';

export function GlobalLoadingContainer({ children }: PropsWithChildren) {
  const { globalLoading, setGlobalLoading } = useGlobalLoadingStore();

  return (
    <Box
      pos="relative"
      style={
        globalLoading
          ? {
              height: '100vh',
              overflow: 'hidden',
            }
          : undefined
      }
    >
      <LoadingOverlay
        zIndex={1000}
        visible={globalLoading}
        h="100vh"
        loaderProps={{
          children: (
            <Flex direction="column" gap="md" align="center">
              <Loader type="bars"></Loader>
              <Text fw="bold" size="xl">
                로딩중...
              </Text>
            </Flex>
          ),
        }}
      />
      {children}
    </Box>
  );
}
