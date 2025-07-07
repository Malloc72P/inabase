'use client';

import { useNavigator } from '@hooks/use-navigator';
import { UiConstants } from '@libs/constants/ui.constant';
import { FindShowsInput } from '@repo/dto';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export interface UseShowSearchProps {
  showsKey: (string | undefined)[];
}

export function useShowSearchForm({ showsKey }: UseShowSearchProps) {
  const queryClient = useQueryClient();
  const param = useSearchParams();
  const navigator = useNavigator();

  const form = useForm<FindShowsInput>({
    defaultValues: {
      keyword: param.get('keyword') || '',
    },
  });

  const onSearchSubmit = async () => {
    const keyword = form.getValues('keyword');
    let param = keyword ? { keyword } : undefined;

    // 이전 검색어에 대한 스크롤 위치를 제거하여, 의도하지 않은 스크롤 복원을 방지합니다.
    sessionStorage.removeItem(UiConstants.sessionStorage.generateKey('shows'));
    const scrollContainer = document.querySelector('#ina-show-list-scroll-area > .scroll-viewport');

    // 검색어가 변경되면 스크롤 위치를 0으로 초기화합니다.
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }

    /**
     * 검색어가 변경되면 이전 캐시를 초기화합니다.
     * 이전 검색어에 대한 캐시가 남아있으면, queryClient는 이전 검색어의 페이지 정보를 유지합니다.
     * 해당 검색어로 재검색하는 경우, 이전에 가져왔던 페이지 개수만큼 데이터를 다시 가져오려고 시도합니다.
     * 하지만 해당 데이터는 이미 stale상태가 되었기에, API를 다시 호출하여 서버에 큰 부하를 줄 수 있습니다.
     * 따라서 재검색하는 경우 첫 페이지부터 다시 가져오도록 캐시를 초기화합니다.
     */
    queryClient.resetQueries({ queryKey: showsKey });

    navigator.moveTo.protected.shows.list(param);
  };

  const clearSearch = () => {
    form.setValue('keyword', '');
    onSearchSubmit();
  };

  /**
   * 검색어가 변경되면, 검색어를 폼에 설정합니다.
   * 페이지 뒤로가기를 하는 경우, 이전 상태가 남아서 API 호출에 사용한 검색어와 input에 바인딩된 검색어가 다른 경우가 있습니다.
   * 이 경우, param에 저장된 검색어를 폼에 설정하여 일치시킵니다.
   */
  useEffect(() => {
    form.setValue('keyword', param.get('keyword') || '');
  }, [param]);

  return { form, onSearchSubmit, clearSearch };
}
