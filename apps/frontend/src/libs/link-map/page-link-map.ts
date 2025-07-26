import { FindShowsInput, FindTagsInput } from '@repo/dto';
import { tail } from './link-map-util';

export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    shows: {
      list: (param?: FindShowsInput) => '/shows' + tail(param),
      detail: (id: string) => `/shows/${id}`,
      create: () => '/shows/create',
      edit: (id: string) => `/shows/${id}/edit`,
    },
    tags: {
      list: (param?: FindTagsInput) => '/tags' + tail(param),
      detail: (id: string) => `/tags/${id}`,
      create: () => '/tags/create',
      edit: (id: string) => `/tags/${id}/edit`,
    },
    artists: () => '/artists',
    account: () => '/account',
  },
  public: {
    landing: () => '/',
  },
} as const;
