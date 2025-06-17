'use client';

import { ApiLinkMap } from '@libs/link-map';
import { FindShowInput } from '@repo/dto';

export const useQueryKey = () => {
  return {
    health: () => ['health'],
    show: {
      detail: (showId: string) => {
        return [ApiLinkMap.shows.detail(showId)];
      },
      list: (params: FindShowInput) => {
        return [ApiLinkMap.shows.list(params)].filter((v) => v);
      },
    },
  };
};
