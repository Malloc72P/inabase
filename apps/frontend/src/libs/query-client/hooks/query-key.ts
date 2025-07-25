'use client';

import { FindShowsInput, FindTagsInput } from '@repo/dto';

const ShowQueryKey = {
  detailKey: 'show-detail',
  detail: (showId: string) => {
    return [ShowQueryKey.detail, showId];
  },
  listKey: 'show-list',
  list: (params: Pick<FindShowsInput, 'keyword'>) => {
    return [ShowQueryKey.list, params.keyword].filter(Boolean);
  },
} as const;

const TagQueryKey = {
  detailKey: 'tag-detail',
  detail: (showId: string) => {
    return [TagQueryKey.detail, showId];
  },
  listKey: 'tag-list',
  list: (params: FindTagsInput) => {
    return [TagQueryKey.listKey, ...Object.values(params)].filter(Boolean);
  },
  allKey: 'tag-all',
  all: () => [TagQueryKey.allKey],
} as const;

export const QueryKey = {
  show: ShowQueryKey,
  tag: TagQueryKey,
};
