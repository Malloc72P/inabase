import { IconMovie, IconTag } from '@tabler/icons-react';
import { useNavigator } from 'src/hooks/use-navigator';

export function useMainNavbarModel() {
  const navigator = useNavigator();

  return [
    {
      label: 'Shows',
      icon: IconMovie,
      value: 'shows',
      onClick: () => navigator.moveTo.protected.shows.list(),
    },
    {
      label: 'Tags',
      icon: IconTag,
      value: 'tags',
      onClick: () => navigator.moveTo.protected.tags.list(),
    },
  ];
}
