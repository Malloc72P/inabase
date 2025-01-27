import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <Box>{children}</Box>;
}
