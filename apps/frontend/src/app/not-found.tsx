'use client';

import { ErrorCard } from '@components/error-card';
import { useNavigator } from '@hooks/use-navigator';
import { Text } from '@mantine/core';
import { useState } from 'react';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotFoundErrorPage() {
  const navigator = useNavigator();

  return (
    <ErrorCard
      title="404 Not Found"
      message={'존재하지 않는 페이지입니다.'}
      reset={() => {
        navigator.moveTo.public.landing();
      }}
      resetBtnLabel="홈페이지로 이동하기"
      description={<Text>아래의 버튼을 홈페이지로 이동해주세요.</Text>}
    />
  );
}
