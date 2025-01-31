import { useAuth } from '@hooks/use-auth';
import { useNavigator } from '@hooks/use-navigator';
import { IconSettings, IconSwitchHorizontal, IconLogout, IconTrash } from '@tabler/icons-react';
import { useState, useMemo } from 'react';

export interface UserMenuModel {
  type: 'button' | 'label' | 'divider';
  label: string;
  icon?: typeof IconSettings;
  color?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function useUserMenuModel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigator();
  const { logout } = useAuth();

  const onChangeAccountClick = () => {
    navigator.moveTo.auth.login();
  };

  const onLogoutClick = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  };

  const menuItems = useMemo<UserMenuModel[]>(
    () => [
      { type: 'label', label: 'Settings' },
      {
        type: 'button',
        label: 'Account settings',
        icon: IconSettings,
        onClick: () => {},
      },
      {
        type: 'button',
        label: 'Change account',
        icon: IconSwitchHorizontal,
        onClick: onChangeAccountClick,
      },
      {
        type: 'button',
        label: 'Logout',
        icon: IconLogout,
        onClick: onLogoutClick,
      },
      { type: 'divider', label: 'divider' },
      {
        type: 'button',
        color: 'red',
        label: 'Delete account',
        icon: IconTrash,
        onClick: () => {},
      },
    ],
    [isLoading]
  );

  return {
    menuItems,
    isLoading,
  };
}
