'use client';

import { MainHeader } from 'src/components/main-header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  const [opened] = useDisclosure(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <MainHeader />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
