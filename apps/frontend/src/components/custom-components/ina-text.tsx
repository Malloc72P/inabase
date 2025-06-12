import { MantineSize, Skeleton, Text, TextProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

export type InaTextProps = TextProps &
  Omit<ComponentPropsWithoutRef<'span'>, keyof TextProps> & {
    loading?: boolean;
    skeletonWidth?: number;
    skeletonHeight?: number;
    fontSize?: number;
    bold?: boolean;
  };

export function InaText({
  fontSize,
  children,
  style,
  bold,
  loading = false,
  skeletonWidth = 100,
  skeletonHeight = 20,
  ...props
}: InaTextProps) {
  if (loading) {
    return <Skeleton width={skeletonWidth} height={skeletonHeight} />;
  }

  return (
    <Text
      style={{
        fontSize,
        ...style,
      }}
      fw={bold ? 'bold' : undefined}
      {...props}
    >
      {children}
    </Text>
  );
}
