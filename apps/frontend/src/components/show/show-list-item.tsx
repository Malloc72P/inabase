import { cn } from 'src/libs/ui';
import { Card, Group, Skeleton, Badge, Text, Flex, Button, ActionIcon } from '@mantine/core';
import classes from './show-list-item.module.css';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useShow } from '@hooks/use-shows';
import { ShowDto } from '@repo/dto';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { ApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';

export interface ShowListItemProps {
  show: ShowDto;
}

const SHOW_LIST_ITEM_WIDTH = 320;

export function ShowListItemLoading() {
  return (
    <Card
      className={cn('show-list-item-skeleton', classes.show)}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Flex justify="space-between" direction="column" gap="xs">
        <Skeleton w="100%" h={20} />
        <Skeleton w={50} h={20} />
      </Flex>
    </Card>
  );
}

export function ShowListItem({ show }: ShowListItemProps) {
  const [hover, setHover] = useState<boolean>(false);
  const { deleteShow } = useShow();
  const { setGlobalLoading } = useGlobalLoadingStore();

  return (
    <Card
      className={cn('show-list-item', classes.show)}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Flex justify="space-between" direction="column" gap="xs">
        <Flex>
          <Text fw="bold">{show.title}</Text>
          <span style={{ flexGrow: 1 }}></span>
          <ActionIcon
            variant="transparent"
            color="gray"
            onClick={async () => {
              try {
                setGlobalLoading(true);
                await deleteShow(show.id);

                notifySuccess({ message: `${show.title} 이(가) 삭제되었습니다.` });
              } catch (error) {
                const apiError = error as ApiError;
                console.error('Failed to delete show:', error);
                notifyError({ message: apiError.message });
              } finally {
                setGlobalLoading(false);
              }
            }}
            style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}
          >
            <IconTrash strokeWidth={1.5}></IconTrash>
          </ActionIcon>
        </Flex>
        {show.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Flex>
    </Card>
  );
}
