import { FindShowsInput } from '@repo/dto';
import { tail } from './link-map-util';

export type ShowsListLinkParam = Pick<FindShowsInput, 'keyword'>;

export const PageLinkMap = {
  auth: {
    login: () => '/login',
    signup: () => '/signup',
  },
  protected: {
    shows: {
      list: (param?: ShowsListLinkParam) => '/shows' + tail(param),
      detail: (id: string) => `/shows/${id}`,
      create: () => '/shows/create',
      edit: (id: string) => `/shows/${id}/edit`,
    },
    tags: {
      list: (param?: any) => '/tags' + tail(param),
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
