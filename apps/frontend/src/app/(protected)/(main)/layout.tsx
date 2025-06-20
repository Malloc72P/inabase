'use client';

import { PROTECTED_HEADER_HEIGHT, ProtectedHeader } from 'src/components/main-header';
import { useMainNavbarModel } from 'src/components/main-navbar';
import { AppShell, Box, Container } from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './layout.module.css';

export default function MainLayout({ children }: PropsWithChildren) {
  const navbarModel = useMainNavbarModel();

  return (
    <AppShell header={{ height: PROTECTED_HEADER_HEIGHT }}>
      <AppShell.Header withBorder={false}>
        <ProtectedHeader navbarModel={navbarModel} />
      </AppShell.Header>

      <AppShell.Main className={classes.layout}>{children}</AppShell.Main>
    </AppShell>
  );
}
