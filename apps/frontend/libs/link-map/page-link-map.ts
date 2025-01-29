export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    main: () => '/main',
  },
  public: {
    landing: () => '/',
  },
} as const;
