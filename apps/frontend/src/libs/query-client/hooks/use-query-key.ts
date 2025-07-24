'use client';

import { ApiLinkMap } from '@libs/link-map';
import { FindShowsInput, FindTagsInput } from '@repo/dto';

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
    tag: {
      list: (params: FindTagsInput) => {
        return ['tags', params.keyword, params.pageIndex, params.pageSize].filter(Boolean);
      },
    },
  };
};

export const QueryKeyConstants = {
  show: {
    list: 'shows',
  },
  tag: {
    list: 'tags',
  },
};
