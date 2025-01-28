export const PageLinkMap = {
  auth: {
    login: () => '/login',
  },
  protected: {
    main: () => '/main',
  },
  public: {
    landing: () => '/',
  },
} as const;
