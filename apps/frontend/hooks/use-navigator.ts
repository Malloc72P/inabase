import { PageLinkMap } from '@libs/link-map';
import { useRouter } from 'next-nprogress-bar';

export const useNavigator = () => {
  const router = useRouter();
  const createNavigateFn = (href: string) => {
    return () => router.push(href);
  };

  return {
    moveTo: {
      auth: {
        login: createNavigateFn(PageLinkMap.auth.login()),
        signup: createNavigateFn(PageLinkMap.auth.signup()),
      },
      public: {
        landing: createNavigateFn(PageLinkMap.public.landing()),
      },
      protected: {
        main: createNavigateFn(PageLinkMap.protected.main()),
      },
    },
  };
};
