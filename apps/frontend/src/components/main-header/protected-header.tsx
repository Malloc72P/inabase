'use client';

import { useSession } from '@libs/stores/session-provider';
import { Box, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { Logo } from 'src/components/logo';
import { INavbarItem, MAIN_NAVBAR_HEIGHT, MainNavbar } from 'src/components/main-navbar';
import { ThemeToggler } from 'src/components/theme-toggler';
import { UserMenu } from 'src/components/user-menu';
import { CommonConstants } from 'src/libs/constants/common';
import { ProtectedAuthGroup } from './header-auth-group';
import classes from './protected-header.module.css';

export interface ProtectedHeaderProps {
  navbarModel: INavbarItem[];
}

export const PROTECTED_HEADER_HEIGHT = 60 + MAIN_NAVBAR_HEIGHT;

export function ProtectedHeader({ navbarModel }: ProtectedHeaderProps) {
  const { user } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pathname = usePathname();

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
              {user && <ProtectedAuthGroup user={user} />}
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* ------ Main Navbar ------ */}
      <MainNavbar selected={pathname} items={navbarModel} />

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
