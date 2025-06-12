import { Env } from 'src/libs/env';

export const ApiLinkMap = {
  health: {
    check: () => Env.beApiUrl + '/health',
  },
  shows: {
    list: () => Env.beApiUrl + '/shows',
    create: () => Env.beApiUrl + '/shows',
    detail: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
    update: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
    delete: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
  },
  auth: {
    signin: () => Env.beApiUrl + '/auth/signin',
    signup: () => Env.beApiUrl + '/auth/signup',
    signout: () => Env.beApiUrl + '/auth/signout',
    profile: {
      get: () => Env.beApiUrl + '/auth/profile',
      update: (id: string) => Env.beApiUrl + `/user/${id}`,
    },
    refresh: () => Env.beApiUrl + '/auth/refresh',
  },
};
