'use client';

import { ApiLinkMap } from '@libs/link-map';

export const useQueryKey = () => {
  return {
    health: () => ['health'],
    show: {
      detail: (showId: string) => {
        return [ApiLinkMap.shows.detail(showId)];
      },
      list: () => {
        return [ApiLinkMap.shows.list()];
      },
    },
  };
};
