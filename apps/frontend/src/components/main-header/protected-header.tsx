'use client';

import { useSession } from '@libs/stores/session-provider';
import { Box, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { Logo } from 'src/components/logo';
import { INavbarItem, MAIN_NAVBAR_HEIGHT, MainNavbar } from 'src/components/main-navbar';
import { ThemeToggler } from 'src/components/theme-toggler';
import { UserMenu } from 'src/components/user-menu';
import { ProtectedAuthGroup } from './header-group';
import classes from './protected-header.module.css';
import { useMemo } from 'react';

export interface ProtectedHeaderProps {
  navbarModel: INavbarItem[];
}

export const PROTECTED_HEADER_HEIGHT = 60 + MAIN_NAVBAR_HEIGHT;

export function ProtectedHeader({ navbarModel }: ProtectedHeaderProps) {
  const { user } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pathname = usePathname();

  const selected = useMemo(() => {
    const splited = pathname.split('/');
    if (splited.length < 2) return undefined;

    return splited[1];
  }, [pathname]);

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
      <MainNavbar selected={selected} items={navbarModel} />

      {/* ------ Mobile Drawer ------ */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title={<Logo clickEnabled={false} />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <>
          <Divider mb="sm" mx="-md" />

          <ScrollArea mx="-md">
            <UserMenu />
          </ScrollArea>
        </>
      </Drawer>
    </Box>
  );
}
