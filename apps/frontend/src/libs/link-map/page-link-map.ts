export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    shows: {
      list: () => '/shows',
      detail: (id: string) => `/shows/${id}`,
      create: () => '/shows/create',
      edit: (id: string) => `/shows/${id}/edit`,
    },
    artists: () => '/artists',
    account: () => '/account',
  },
  public: {
    landing: () => '/',
  },
} as const;
