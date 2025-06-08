import { useNavigator } from 'src/hooks/use-navigator';
import { PageLinkMap } from 'src/libs/link-map';
import { IconMovie, IconUserSquare } from '@tabler/icons-react';

export function useMainNavbarModel() {
  const navigator = useNavigator();

  return [
    {
      label: 'Shows',
      icon: IconMovie,
      value: PageLinkMap.protected.shows(),
      onClick: navigator.moveTo.protected.shows,
    },
    {
      label: 'Artists',
      icon: IconUserSquare,
      value: PageLinkMap.protected.artists(),
      onClick: navigator.moveTo.protected.artists,
    },
  ];
}
