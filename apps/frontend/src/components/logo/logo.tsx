'use client';

import { useNavigator } from 'src/hooks/use-navigator';
import classes from './logo.module.css';
import { Text, MantineSize, TextProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@libs/ui';

export interface LogoProps
  extends TextProps,
    Omit<ComponentPropsWithoutRef<'div'>, keyof TextProps> {
  clickEnabled?: boolean;
}

export function Logo({ onClick, className, clickEnabled = true, ...props }: LogoProps) {
  const navigator = useNavigator();

  return (
    <Text
      {...props}
      data-click-enabled={clickEnabled}
      className={cn(classes.logo, className)}
      onClick={() => {
        if (!clickEnabled) return;

        navigator.moveTo.public.landing();
      }}
    >
      💎 Inabase
    </Text>
  );
}
