import { Env } from '@libs/env';

export const ApiLinkMap = {
  health: {
    check: () => Env.beApiUrl + '/health',
  },
  shows: {
    list: () => Env.beApiUrl + '/shows',
  },
  auth: {
    signin: () => Env.beApiUrl + '/auth/signin',
    signout: () => Env.beApiUrl + '/auth/signout',
    profile: () => Env.beApiUrl + '/auth/profile',
  },
};
