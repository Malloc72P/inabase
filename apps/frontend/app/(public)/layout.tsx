import { MainHeader } from '@components/main-header';
import { MainNavbar } from '@components/main-navbar';
import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function PublicPageLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
