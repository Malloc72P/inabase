export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    shows: () => '/shows',
    createShow: () => '/shows/create',
    artists: () => '/artists',
    account: () => '/account',
  },
  public: {
    landing: () => '/',
  },
} as const;
