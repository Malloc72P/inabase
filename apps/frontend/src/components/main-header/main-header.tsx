'use client';

import { CustomLink, CustomLinkType } from 'src/components/custom-link';
import { Logo } from 'src/components/logo';
import { ThemeToggler } from 'src/components/theme-toggler';
import { CommonConstants } from 'src/libs/constants/common';
import { Box, Burger, Divider, Drawer, Flex, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProtectedAuthGroup, PublicAuthGroup } from './header-group';
import classes from './main-header.module.css';
import { usePublicHeaderLinkModel } from './use-public-header-link-model';
import { useSession } from '@libs/stores/session-provider';
import { useUserMenuModel } from '@components/user-menu/use-user-menu-model';

export interface MainHeaderProps {}

const mobileSize = 'md';

export function MainHeader({}: MainHeaderProps) {
  const { state, user } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const userMenuModel = useUserMenuModel();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="start" h="100%">
          <Logo />

          <Group h="100%" gap={0} visibleFrom={mobileSize} ml={100}>
            <HeaderLinks />
          </Group>

          <Box style={{ flexGrow: 1 }} />

          <Group>
            <ThemeToggler />

            {/* ------ 헤더 우측 버튼 그룹(로그인,회원가입 - 유저 드랍다운 버튼 ------ */}
            <Group visibleFrom={mobileSize} justify="end">
              {state === 'authenticated' && user ? (
                <ProtectedAuthGroup user={user} />
              ) : (
                <PublicAuthGroup />
              )}
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom={mobileSize} />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title={<Logo clickEnabled={false} />}
        hiddenFrom={mobileSize}
        zIndex={1000000}
      >
        <>
          <Divider mb="sm" mx="-md" />

          <ScrollArea
            mx="-md"
            onClick={(e) => {
              const buttonElement = (e.target as HTMLElement)?.closest(
                '[data-type="button"], button'
              );

              if (buttonElement) {
                closeDrawer();
              }
            }}
          >
            <HeaderLinks />

            {state === 'authenticated' ? (
              userMenuModel.menuItems
                .filter((link) => link.type !== 'divider')
                .map((link) => <CustomLink key={link.label} type={link.type} link={link} />)
            ) : (
              <Flex direction="column" maw="95%" mx="auto" justify="center" gap="xl" mt="xl">
                <PublicAuthGroup />
              </Flex>
            )}
          </ScrollArea>
        </>
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
