import { PageLinkMap } from '@libs/link-map';
import { useRouter } from 'next/navigation';

export const useNavigator = () => {
  const router = useRouter();

  return {
    main: {
      landing: () => router.push(PageLinkMap.protected.main()),
    },
    auth: {
      login: () => router.push(PageLinkMap.protected.main()),
    },
  };
};
