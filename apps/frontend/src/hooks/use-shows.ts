'use client';

import { createShowApi, deleteShowApi, findShowsApi, UpdateShowApi } from '@libs/fetcher/shows';

import { CreateShowInput, UpdateShowInput } from '@repo/dto';
import { ApiLinkMap } from 'src/libs/link-map/api-link-map';
import useSWR from 'swr';

export function useShows() {
  const swrObj = useSWR(ApiLinkMap.shows.list(), findShowsApi);

  const createShow = async (input: CreateShowInput) => {
    const response = await createShowApi(input);

    swrObj.mutate(
      (data) => ({
        shows: [...(data?.shows || []), response.show],
      }),
      false
    );

    return response;
  };

  const deleteShow = async (showId: string) => {
    await deleteShowApi(showId);

    swrObj.mutate(
      (data) => ({
        shows: data?.shows.filter((show) => show.id !== showId) || [],
      }),
      false
    );

    return true;
  };

  const updateShow = async (showId: string, input: UpdateShowInput) => {
    const { show } = await UpdateShowApi(showId, input);

    swrObj.mutate(
      (data) => ({
        shows: data?.shows.map((s) => (s.id === showId ? show : s)) || [],
      }),
      false
    );

    return true;
  };

  return {
    shows: swrObj.data ? swrObj.data.shows : [],
    isShowLoading: swrObj.isLoading,
    showSwr: swrObj,
    createShow,
    updateShow,
    deleteShow,
  };
}
