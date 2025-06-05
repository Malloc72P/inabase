import { useNavigator } from 'src/hooks/use-navigator';
import { PageLinkMap } from 'src/libs/link-map';
import { IconSettings } from '@tabler/icons-react';

export function useAccountNavbarModel() {
  const navigator = useNavigator();

  return [
    {
      label: 'Account  Setting',
      icon: IconSettings,
      value: PageLinkMap.protected.account(),
      onClick: navigator.moveTo.protected.account,
    },
  ];
}
