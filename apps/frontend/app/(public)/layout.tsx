'use client';

import { MainHeader } from '@components/main-header';
import { MainNavbar } from '@components/main-navbar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function PublicPageLayout({ children }: PropsWithChildren) {
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
        <MainHeader />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
