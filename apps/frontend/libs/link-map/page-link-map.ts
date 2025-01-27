export const PageLinkMap = {
  auth: {
    login: () => '/login',
  },
  protected: {
    main: () => '/main',
  },
  unprotected: {
    landing: () => '/',
  },
} as const;
