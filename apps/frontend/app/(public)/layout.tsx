'use client';

import { MainFooter } from '@components/main-footer';
import { MainHeader2 } from '@components/main-header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function PublicPageLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <MainHeader2 />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Section>
        <MainFooter />
      </AppShell.Section>
    </AppShell>
  );
}
