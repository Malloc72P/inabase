import { Env } from '@libs/env';

export const Api = {
  health: {
    check: () => Env.beApiUrl + '/health',
  },
  shows: {
    list: () => Env.beApiUrl + '/shows',
  },
};
