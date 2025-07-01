import { Container } from '@mantine/core';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <Container py={32}>{children}</Container>;
}
