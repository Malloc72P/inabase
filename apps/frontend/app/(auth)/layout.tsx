'use client';

import { MainHeader } from '@components/main-header';
import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  const [opened] = useDisclosure(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <MainHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Box mt="15%">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
