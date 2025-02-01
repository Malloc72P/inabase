'use client';

import { PROTECTED_HEADER_HEIGHT, ProtectedHeader } from '@components/main-header';
import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function ProtectedClientLayout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: PROTECTED_HEADER_HEIGHT }}>
      <AppShell.Header withBorder={false}>
        <ProtectedHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Box pt={42}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
