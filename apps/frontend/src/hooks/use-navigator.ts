import { PageLinkMap } from 'src/libs/link-map';
import { useRouter } from 'next-nprogress-bar';

export const useNavigator = () => {
  const router = useRouter();

  return {
    moveTo: {
      auth: {
        login: () => router.push(PageLinkMap.auth.login()),
        signup: () => router.push(PageLinkMap.auth.signup()),
      },
      public: {
        landing: () => router.push(PageLinkMap.public.landing()),
      },
      protected: {
        shows: {
          list: () => router.push(PageLinkMap.protected.shows.list()),
          detail: (id: string) => router.push(PageLinkMap.protected.shows.detail(id)),
        },
        createShow: () => router.push(PageLinkMap.protected.shows.create()),
        artists: () => router.push(PageLinkMap.protected.artists()),
        account: () => router.push(PageLinkMap.protected.account()),
      },
      external: {
        inabaseGithub: () => window.open('https://github.com/Malloc72P/inabase', '_blank'),
        malloc72pGithub: () => window.open('https://github.com/Malloc72P', '_blank'),
      },
    },
  };
};
