import { Container } from '@mantine/core';
import { PropsWithChildren } from 'react';

export default function TagPageLayout({ children }: PropsWithChildren) {
  return <Container pt={42}>{children}</Container>;
}
