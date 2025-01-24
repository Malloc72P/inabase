import { useHealthCheck } from '@hooks/use-health-check';
import { useNavigator } from '@hooks/use-navigator';
import { PageLinkMap } from '@libs/link-map';
import { Badge, Box, Divider, Flex, Loader, Skeleton, Text } from '@mantine/core';
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogin,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import classes from './main-navbar.module.css';
import { useAuth } from '@hooks/use-auth';
import { useSession } from 'next-auth/react';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export function MainNavbar() {
  const [active, setActive] = useState('Billing');
  const { health, isHealthLoading } = useHealthCheck();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <Box>
        <Flex gap="xs" align="center" mb="md" h="25px">
          <Text fw="bold">API Server: </Text>
          {isHealthLoading ? (
            <Loader type="dots" size="sm" />
          ) : (
            <Flex gap="xs">
              <Badge>{health?.serverAddr}</Badge>
              <Badge color="green">{health?.statusCode}</Badge>
            </Flex>
          )}
        </Flex>
        <Divider />
      </Box>
      <div className={classes.navbarMain}>{links}</div>

      <MainNavbarFooter />
    </nav>
  );
}

function MainNavbarFooter() {
  const { logout } = useAuth();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <MainNavbarFooterSkeleton />;
  }

  return (
    <div className={classes.footer}>
      {status === 'unauthenticated' && (
        <>
          <Link href={PageLinkMap.auth.login()} className={classes.link}>
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </Link>
        </>
      )}

      {status === 'authenticated' && (
        <>
          <a href="#" className={classes.link}>
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{session.email}</span>
          </a>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              logout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </>
      )}
    </div>
  );
}

function MainNavbarFooterSkeleton() {
  return (
    <Flex direction="column" gap="xs">
      <Skeleton w="20%" h={30}></Skeleton>
      <Skeleton w="100%" h={30}></Skeleton>
      <Skeleton w="100%" h={30}></Skeleton>
    </Flex>
  );
}
