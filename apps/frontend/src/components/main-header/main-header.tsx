'use client';

import { CustomLink } from 'src/components/custom-link';
import { Logo } from 'src/components/logo';
import { ThemeToggler } from 'src/components/theme-toggler';
import { CommonConstants } from 'src/libs/constants/common';
import { Box, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProtectedAuthGroup, PublicAuthGroup } from './header-auth-group';
import classes from './main-header.module.css';
import { usePublicHeaderLinkModel } from './use-public-header-link-model';
import { useSession } from '@libs/stores/session-provider';

export interface MainHeaderProps {}

export function MainHeader({}: MainHeaderProps) {
  const { state, user } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="start" h="100%">
          <Logo />

          <Group h="100%" gap={0} visibleFrom="sm" ml={100}>
            <HeaderLinks />
          </Group>

          <Box style={{ flexGrow: 1 }} />

          <Group>
            <ThemeToggler />

            <Group visibleFrom="sm" justify="end">
              {state === 'authenticated' && user ? (
                <ProtectedAuthGroup user={user} />
              ) : (
                <PublicAuthGroup />
              )}
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

          <HeaderLinks />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

function HeaderLinks() {
  const { links } = usePublicHeaderLinkModel();

  return (
    <>
      {links.map((link) => (
        <CustomLink key={link.label} link={link} />
      ))}
    </>
  );
}
