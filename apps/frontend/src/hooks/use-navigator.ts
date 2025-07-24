import { PageLinkMap, ShowsListLinkParam } from 'src/libs/link-map';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

export const useNavigator = () => {
  const router = useRouter();

  const navigator = useMemo(() => {
    return {
      moveTo: {
        back: () => router.back(),
        auth: {
          login: () => router.push(PageLinkMap.auth.login()),
          signup: () => router.push(PageLinkMap.auth.signup()),
        },
        public: {
          landing: () => router.push(PageLinkMap.public.landing()),
        },
        protected: {
          shows: {
            list: (param?: ShowsListLinkParam) =>
              router.push(PageLinkMap.protected.shows.list(param), { scroll: false }),
            detail: (id: string) => router.push(PageLinkMap.protected.shows.detail(id)),
            create: () => router.push(PageLinkMap.protected.shows.create()),
            edit: (id: string) => router.push(PageLinkMap.protected.shows.edit(id)),
          },
          tags: {
            list: () => router.push(PageLinkMap.protected.tags.list()),
            create: () => router.push(PageLinkMap.protected.tags.create()),
            edit: (tagId: string) => router.push(PageLinkMap.protected.tags.edit(tagId)),
          },
          artists: () => router.push(PageLinkMap.protected.artists()),
          account: () => router.push(PageLinkMap.protected.account()),
        },
        external: {
          inabaseGithub: () => window.open('https://github.com/Malloc72P/inabase', '_blank'),
          malloc72pGithub: () => window.open('https://github.com/Malloc72P', '_blank'),
        },
      },
    };
  }, []);

  return navigator;
};
