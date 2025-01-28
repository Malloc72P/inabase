import { PageLinkMap } from '@libs/link-map';
import { useRouter } from 'next/navigation';

export const useNavigator = () => {
  const router = useRouter();

  return {
    moveTo: {
      auth: {
        login: () => router.push(PageLinkMap.auth.login()),
      },
      public: {
        landing: () => router.push(PageLinkMap.public.landing()),
      },
      protected: {
        main: () => router.push(PageLinkMap.protected.main()),
      },
    },
  };
};
