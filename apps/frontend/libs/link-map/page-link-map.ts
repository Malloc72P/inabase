export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    main: () => '/main',
    artists: () => '/artists',
  },
  public: {
    landing: () => '/',
  },
} as const;
