'use client';

import { ErrorCard } from '@components/error-card';
import { Text } from '@mantine/core';
import { useState } from 'react';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [errorMessage, setErrorMessage] = useState(
    error.message || '알 수 없는 에러가 발생했습니다.'
  );
  return (
    <ErrorCard
      title="앗... 에러가 발생했어요...!"
      message={errorMessage}
      reset={reset}
      resetBtnLabel="페이지 새로고침"
      description={
        <Text>
          아래의 버튼을 눌러서 새로고침해주세요. <br /> 혹시 증상이 계속된다면 관리자에게
          문의해주세요!
        </Text>
      }
    />
  );
}
