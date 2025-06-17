'use client';

import { ApiLinkMap } from '@libs/link-map';

export const useQueryKey = () => {
  return {
    health: () => ['health'],
    show: {
      detail: (showId: string) => {
        return [ApiLinkMap.shows.detail(showId)];
      },
      list: (keywords?: string) => {
        console.log('queryKeyBuilder: keywords', keywords);

        return [ApiLinkMap.shows.list(), keywords ? { keywords } : undefined].filter((v) => v);
      },
    },
  };
};
