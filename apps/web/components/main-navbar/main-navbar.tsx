import { useState } from 'react';
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Badge, Box, Code, Divider, Flex, Group, Loader, Text } from '@mantine/core';
import classes from './main-navbar.module.css';
import { useHealthCheck } from '@hooks/use-health-check';

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

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
