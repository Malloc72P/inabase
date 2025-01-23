import { PageLinkMap } from '@libs/link-map';
import { useRouter } from 'next/navigation';

export const useNavigator = () => {
  const router = useRouter();

  return {
    main: {
      landing: () => router.push(PageLinkMap.main.landing()),
    },
    auth: {
      login: () => router.push(PageLinkMap.main.landing()),
    },
  };
};
