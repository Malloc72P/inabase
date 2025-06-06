'use client';

import { useNavigator } from 'src/hooks/use-navigator';
import classes from './logo.module.css';
import { Text, MantineSize, TextProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@libs/ui';

export interface LogoProps
  extends TextProps,
    Omit<ComponentPropsWithoutRef<'div'>, keyof TextProps> {}

export function Logo({ onClick, className, ...props }: LogoProps) {
  const navigator = useNavigator();

  return (
    <Text
      {...props}
      className={cn(classes.logo, className)}
      onClick={() => {
        navigator.moveTo.public.landing();
      }}
    >
      💎 Inabase
    </Text>
  );
}
