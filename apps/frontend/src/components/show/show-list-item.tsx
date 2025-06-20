import { IconButton } from '@components/buttons';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useNavigator } from '@hooks/use-navigator';
import { useShowMutation } from '@hooks/use-show-mutation';
import { ApiError } from '@libs/fetcher';
import { PageLinkMap } from '@libs/link-map';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';
import { Badge, Box, Flex, Group, Skeleton, Text } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from 'src/libs/ui';
import classes from './show-list-item.module.css';
import { DateUtil } from '@repo/date-util';

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
  const { deleteShow } = useShowMutation();
  const { setGlobalLoading } = useGlobalLoadingStore();
  const navigator = useNavigator();

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
          <Group style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}>
            <IconButton
              icon={IconEdit}
              onClick={() => {
                navigator.moveTo.protected.shows.edit(show.id);
              }}
              variant="transparent"
            />
            <IconButton icon={IconTrash} onClick={onDeleteBtnClicked} variant="transparent" />
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

        <Flex>
          <Text size="sm" color="dimmed">
            생성일: {DateUtil.format(show.createdAt, 'postCard')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
