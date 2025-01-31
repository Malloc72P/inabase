'use client';

import { ProtectedHeader } from '@components/main-header';
import { MainNavbar } from '@components/main-navbar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function ProtectedClientLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <ProtectedHeader />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <MainNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
