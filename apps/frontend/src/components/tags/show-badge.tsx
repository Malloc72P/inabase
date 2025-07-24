import { Badge, BadgeProps } from '@mantine/core';

export interface ShowTagBadgeProps extends BadgeProps {
  tag: string;
}

export function ShowTagBadge({ tag, ...props }: ShowTagBadgeProps) {
  return (
    <Badge key={tag} {...props} variant="light" style={{ flexShrink: 0 }}>
      {tag}
    </Badge>
  );
}
