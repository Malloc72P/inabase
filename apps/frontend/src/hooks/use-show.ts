'use client';

import { UpdateShowApi } from '@libs/fetcher/shows';
import { findShowApi } from '@libs/fetcher/shows/find-show.api';
import { UpdateShowInput } from '@repo/dto';

import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import useSWR from 'swr';

export function useShow(showId: string) {
  const swrObj = useSWR(ApiLinkMap.shows.detail(showId), () => findShowApi(showId));

  const updateShow = async (showId: string, input: UpdateShowInput) => {
    const { show } = await UpdateShowApi(showId, input);

    swrObj.mutate(
      (data) => ({
        show: data ? { ...data.show, ...show } : show,
      }),
      false
    );

    return true;
  };

  return {
    show: swrObj.data ? swrObj.data.show : null,
    isShowLoading: swrObj.isLoading,
    showSwr: swrObj,
    updateShow,
  };
}
