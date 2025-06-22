'use client';

import { useNavigator } from '@hooks/use-navigator';
import { UiConstants } from '@libs/constants/ui.constant';
import { FindShowsInput } from '@repo/dto';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export interface UseShowSearchProps {}

export function useShowSearchForm() {
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

    sessionStorage.removeItem(UiConstants.sessionStorage.generateKey('shows'));
    navigator.moveTo.protected.shows.list(param);
  };

  /**
   * 검색어가 변경되면, 검색어를 폼에 설정합니다.
   * 페이지 뒤로가기를 하는 경우, 이전 상태가 남아서 API 호출에 사용한 검색어와 input에 바인딩된 검색어가 다른 경우가 있습니다.
   * 이 경우, param에 저장된 검색어를 폼에 설정하여 일치시킵니다.
   */
  useEffect(() => {
    form.setValue('keyword', param.get('keyword') || '');
  }, [param]);

  return { form, onSearchSubmit };
}
