'use client';

import { Logo } from '@components/logo';
import { ThemeToggler } from '@components/theme-toggler';
import { CommonConstants } from '@libs/constants/common';
import { Box, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProtectedAuthGroup } from './header-auth-group';
import classes from './protected-header.module.css';
import { UserMenu } from '@components/user-menu';
import { MAIN_NAVBAR_HEIGHT, MainNavbar } from '@components/main-navbar';
import { usePathname } from 'next/navigation';
import { useNavigator } from '@hooks/use-navigator';
import { PageLinkMap } from '@libs/link-map';
import { IconMovie, IconUserBolt, IconUserCircle, IconUserSquare } from '@tabler/icons-react';

export interface ProtectedHeaderProps {}

export const PROTECTED_HEADER_HEIGHT = 60 + MAIN_NAVBAR_HEIGHT;

export function ProtectedHeader({}: ProtectedHeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pathname = usePathname();
  const navigator = useNavigator();

  console.log('pathname', pathname);

  return (
    <Box className={classes.container}>
      {/* ------ Main Header ------ */}
      <header className={classes.header}>
        <Group justify="start" h="100%">
          <Logo />

          <Box style={{ flexGrow: 1 }} />

          <Group>
            <ThemeToggler />
            <Group visibleFrom="sm" justify="end">
              <ProtectedAuthGroup />
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* ------ Main Navbar ------ */}
      <MainNavbar
        selected={pathname}
        items={[
          {
            label: 'Shows',
            icon: IconMovie,
            value: PageLinkMap.protected.main(),
            onClick: navigator.moveTo.protected.main,
          },
          {
            label: 'Artists',
            icon: IconUserSquare,
            value: PageLinkMap.protected.artists(),
            onClick: navigator.moveTo.protected.artists,
          },
        ]}
      />

      {/* ------ Mobile Drawer ------ */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={CommonConstants.appName}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <UserMenu />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
