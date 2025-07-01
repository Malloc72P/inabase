import { useAuth } from 'src/hooks/use-auth';
import { useNavigator } from 'src/hooks/use-navigator';
import { notifySuccess } from 'src/hooks/use-notification';
import {
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconTrash,
  IconHome,
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';

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
  const navigator = useNavigator();
  const { logout } = useAuth();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const onChangeAccountClick = () => {
    navigator.moveTo.auth.login();
  };

  const onLogoutClick = async () => {
    try {
      setGlobalLoading(true);
      await logout();

      notifySuccess({ title: '로그아웃 성공', message: '로그아웃 되었습니다.' });
      navigator.moveTo.public.landing();
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const onAccountSettingClick = () => {
    navigator.moveTo.protected.account();
  };

  const onHomeClick = () => {
    navigator.moveTo.protected.shows.list();
  };

  const menuItems = useMemo<UserMenuModel[]>(
    () => [
      { type: 'label', label: 'My Page' },
      {
        type: 'button',
        label: 'Home',
        icon: IconHome,
        onClick: onHomeClick,
      },
      { type: 'label', label: 'Settings' },
      {
        type: 'button',
        label: 'Account settings',
        icon: IconSettings,
        onClick: onAccountSettingClick,
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
    []
  );

  return {
    menuItems,
  };
}
