import { Text, Card, Title, Divider, Button } from '@mantine/core';
import { ReactElement } from 'react';

export interface ErrorCardProps {
  title?: string;
  message: string;
  reset?: () => void;
  resetBtnLabel?: string;
  description: ReactElement;
}

export function ErrorCard({
  title = '앗... 에러가 발생했어요...!',
  message,
  reset,
  resetBtnLabel = '페이지 새로고침',
  description,
}: ErrorCardProps) {
  return (
    <Card withBorder shadow="md" radius={'md'} maw={600} mx={'auto'} mt={'20vh'} p={32}>
      <Title mb={'md'}>{title}</Title>
      <Divider mb={'md'} />
      <Text mb={'md'} c={'dimmed'}>
        {message}
      </Text>

      {description}

      {reset && (
        <Button mt={'md'} onClick={reset}>
          {resetBtnLabel}
        </Button>
      )}
    </Card>
  );
}
