'use client';

import { MainHeader } from '@components/main-header';
import { AppShell, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { relative } from 'path';
import { PropsWithChildren } from 'react';
import classes from './layout.module.css';

export default function AuthLayout({ children }: PropsWithChildren) {
  const [opened] = useDisclosure(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <MainHeader />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
