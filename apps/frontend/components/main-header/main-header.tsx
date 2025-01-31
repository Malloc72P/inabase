'use client';

import { Logo } from '@components/logo';
import { ThemeToggler } from '@components/theme-toggler';
import { useNavigator } from '@hooks/use-navigator';
import {
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { MouseEventHandler } from 'react';
import { AuthGroup } from './header-auth-group';
import classes from './main-header.module.css';
import { CommonConstants } from '@libs/constants/common';

export type MainHeaderMode = 'public' | 'protected';

export interface MainHeaderProps {
  mode?: MainHeaderMode;
}

export function MainHeader({ mode = 'public' }: MainHeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={120}>
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
              <AuthGroup />
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

          <Divider my="sm" />

          <Flex direction="column" gap="md" p="md">
            <AuthGroup />
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

function HeaderLinks() {
  const navigator = useNavigator();

  const onHomeClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.moveTo.public.landing();
  };

  const onMainClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.moveTo.protected.main();
  };

  const onProjectClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.moveTo.external.inabaseGithub();
  };

  const onDeveloperClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.moveTo.external.malloc72pGithub();
  };

  return (
    <>
      <a href="#" className={classes.link} onClick={onHomeClick}>
        Home
      </a>
      <a href="#" className={classes.link} onClick={onMainClick}>
        Main
      </a>

      <a href="#" className={classes.link} onClick={onProjectClick}>
        Project
      </a>

      <a href="#" className={classes.link} onClick={onDeveloperClick}>
        Developer
      </a>
    </>
  );
}
