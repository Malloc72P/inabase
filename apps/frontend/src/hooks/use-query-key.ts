'use client';

import { ApiLinkMap } from '@libs/link-map';
import { FindShowsInput } from '@repo/dto';

export const useQueryKey = () => {
  return {
    health: () => ['health'],
    show: {
      detail: (showId: string) => {
        return [ApiLinkMap.shows.detail(showId)];
      },
      list: (params: Pick<FindShowsInput, 'keyword'>) => {
        return ['shows', params.keyword].filter(Boolean);
      },
    },
  };
};
