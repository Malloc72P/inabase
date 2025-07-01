import { IconButton } from '@components/buttons';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useNavigator } from '@hooks/use-navigator';
import { useShowMutation } from '@hooks/use-show-mutation';
import { ApiError } from '@libs/fetcher';
import { PageLinkMap } from '@libs/link-map';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';
import { Badge, Box, BoxProps, Card, Flex, Group, Skeleton, Text } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { IconBoxOff, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from 'src/libs/ui';
import classes from './show-list-item.module.css';
import { DateUtil } from '@repo/date-util';
import { UiConstants } from '@libs/constants/ui.constant';
import { useShows } from '@hooks/use-shows';
import { ShowTagBadge } from './show-badge';

export interface ShowListItemProps extends BoxProps {
  show: ShowDto;
  isLast?: boolean;
}

export function ShowListItem({ show, isLast = false, ...props }: ShowListItemProps) {
  const [hover, setHover] = useState<boolean>(false);
  const { setGlobalLoading } = useGlobalLoadingStore();
  const navigator = useNavigator();
  const { deleteShow } = useShowMutation();

  const onDeleteBtnClicked = async () => {
    let timeoutId: NodeJS.Timeout | null = null;
    try {
      timeoutId = setTimeout(() => setGlobalLoading(true), UiConstants.delay.globalLoading);
      await deleteShow(show.id);

      notifySuccess({ message: `${show.title} 이(가) 삭제되었습니다.` });
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Failed to delete show:', error);
      notifyError({ message: apiError.message });
    } finally {
      timeoutId && clearTimeout(timeoutId);
      setGlobalLoading(false);
    }
  };

  return (
    <Box
      {...props}
      className={cn('show-list-item', classes.show)}
      p="lg"
      h={135}
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
          <ShowTagBadge tag={show.id} />
          {show.tags.map((tag) => (
            <ShowTagBadge key={tag} tag={tag} />
          ))}
        </Flex>

        <Flex>
          <Text size="sm" c="dimmed">
            {DateUtil.format(show.createdAt, 'short')} 작성됨
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export function ShowListItemLoading({
  tagCount = 3,
  isLast = false,
}: {
  tagCount?: number;
  isLast?: boolean;
}) {
  return (
    <Box
      className={cn('show-list-item-skeleton', classes.show)}
      p="lg"
      data-last={isLast ? 'true' : 'false'}
    >
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

export function ShowListItemEmptyView() {
  return (
    <Card p="xl" id="ina-show-list-empty" withBorder shadow="md" radius={'md'}>
      <Flex direction="column" gap="md" justify={'center'} align="center" py={'xl'}>
        <IconBoxOff size={64} stroke={1.5} color="gray" />
        <Text size="xl" fs={'italic'}>
          데이터가 없습니다. 다른 검색어로 검색해보세요.
        </Text>
      </Flex>
    </Card>
  );
}
