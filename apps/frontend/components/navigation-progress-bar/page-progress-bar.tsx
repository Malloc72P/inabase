'use client';

import { useMantineTheme } from '@mantine/core';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function PageProgressBar() {
  const { primaryColor } = useMantineTheme();

  return (
    <ProgressBar height="4px" color={primaryColor} options={{ showSpinner: true }} shallowRouting />
  );
}
