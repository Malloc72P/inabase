'use client';

import { Logo } from '@components/logo';
import { ThemeToggler } from '@components/theme-toggler';
import { CommonConstants } from '@libs/constants/common';
import { Box, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProtectedAuthGroup } from './header-auth-group';
import classes from './protected-header.module.css';
import { UserMenu } from '@components/user-menu';

export interface ProtectedHeaderProps {}

export function ProtectedHeader({}: ProtectedHeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  //   useHeader

  return (
    <Box pb={120}>
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
