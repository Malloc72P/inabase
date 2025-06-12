import { IconButton } from '@components/buttons';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShows } from '@hooks/use-shows';
import { ApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';
import { Badge, Box, Flex, Group, Skeleton, Text } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { cn } from 'src/libs/ui';
import classes from './show-list-item.module.css';
import Link from 'next/link';
import { PageLinkMap } from '@libs/link-map';

export interface ShowListItemProps {
  show: ShowDto;
  isLast?: boolean;
}

export function ShowListItemLoading({ tagCount = 3 }: { tagCount?: number }) {
  return (
    <Box className={cn('show-list-item-skeleton', classes.show)} p="lg">
      <Flex justify="space-between" direction="column" gap="xs">
        <Skeleton w="70%" h={20} />
        <Flex gap={'md'}>
          {Array.from({ length: tagCount }).map((_, index) => (
            <Skeleton key={index} w={50} h={20} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export function ShowListItem({ show, isLast = false }: ShowListItemProps) {
  const [hover, setHover] = useState<boolean>(false);
  const { deleteShow } = useShows();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const onDeleteBtnClicked = async () => {
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
  };

  return (
    <Box
      className={cn('show-list-item', classes.show)}
      p="lg"
      data-last={isLast ? 'true' : 'false'}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Flex justify="space-between" direction="column" gap={'sm'}>
        {/* First Row */}
        <Flex>
          <Link href={PageLinkMap.protected.shows.detail(show.id)}>
            <Text fw="bold">{show.title}</Text>
          </Link>
          <span style={{ flexGrow: 1 }}></span>
          <Group>
            <IconButton
              icon={IconTrash}
              onClick={onDeleteBtnClicked}
              style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}
              variant="transparent"
            />
          </Group>
        </Flex>

        {/* Second Row */}
        <Flex gap={'md'} wrap={'wrap'} align="center">
          {show.tags.map((tag) => (
            <Badge key={tag} variant="light" style={{ flexShrink: 0 }}>
              {tag}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
