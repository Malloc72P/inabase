import { Card, Group, Skeleton, Badge, Text } from '@mantine/core';

export interface ShowListItemProps {
  title: string;
  tags?: string[];
}

const SHOW_LIST_ITEM_WIDTH = 320;

export function ShowListItemSkeleton() {
  return (
    <Card
      className="show-list-item-skeleton"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      maw={SHOW_LIST_ITEM_WIDTH}
    >
      <Group justify="space-between">
        <Skeleton w={SHOW_LIST_ITEM_WIDTH} h={20} />

        <Skeleton w={50} h={20} />
      </Group>
    </Card>
  );
}

export function ShowListItem({ title, tags = [] }: ShowListItemProps) {
  return (
    <Card
      className="show-list-item"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      maw={SHOW_LIST_ITEM_WIDTH}
    >
      <Group justify="space-between">
        <Text fw="bold">{title}</Text>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Group>
    </Card>
  );
}
