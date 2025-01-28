import { useAuth } from '@hooks/use-auth';
import { useNavigator } from '@hooks/use-navigator';
import { useMantineTheme, Menu, UnstyledButton, Group, Text } from '@mantine/core';
import {
  IconChevronDown,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconTrash,
} from '@tabler/icons-react';
import { Session } from 'next-auth';
import { useState } from 'react';
import classes from './user-menu.module.css';
import { cn } from '@libs/ui';

export interface UserMenuProps {
  session: Session;
}

export function UserMenu({ session }: UserMenuProps) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const navigator = useNavigator();

  const onChangeAccountClick = () => {
    navigator.moveTo.auth.login();
  };

  const onLogoutClick = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cn(classes.user, classes.userActive)}>
          <Group gap={7}>
            {/* <Avatar src={user.image} alt={user.name} radius="xl" size={20} /> */}
            <Text fw={500} size="sm" lh={1} mr={3}>
              {session.name}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item
          onClick={onChangeAccountClick}
          leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
        >
          Change account
        </Menu.Item>
        <Menu.Item onClick={onLogoutClick} leftSection={<IconLogout size={16} stroke={1.5} />}>
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
