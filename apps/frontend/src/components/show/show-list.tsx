import { Box, Flex, Loader, SimpleGrid, Skeleton, Title } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { ShowListItemLoading, ShowListItem } from './show-list-item';
import { useVirtualizer } from '@tanstack/react-virtual';

import classes from './show-list.module.css';
import { useEffect } from 'react';
export interface ShowListProps {
  shows: ShowDto[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isInitialLoading: boolean;
  isNextLoading: boolean;
}

export function ShowList({ shows, isInitialLoading, isNextLoading, scrollRef }: ShowListProps) {
  const rowVirtualizer = useVirtualizer({
    count: shows.length,
    getScrollElement: () => scrollRef?.current,
    estimateSize: () => 133.3,
    overscan: 20,
  });

  useEffect(() => {
    console.log('debug', {
      virtualizedCount: rowVirtualizer.getVirtualItems().length,
      realCount: shows.length,
    });

    return () => {};
  }, [shows]);

  return (
    <Box>
      {isInitialLoading && !isNextLoading && <ShowListLoading />}
      <Box
        pos={'relative'}
        className={classes.showList}
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((vRow) => {
          const show = shows[vRow.index];

          if (!show) {
            return null;
          }

          return (
            <ShowListItem
              key={show.id}
              show={show}
              isLast={shows.indexOf(show) === shows.length - 1}
              style={{
                position: 'absolute',
                top: `0px`,
                left: 0,
                width: '100%',
                transform: `translateY(${vRow.start}px)`,
              }}
            />
          );
        })}
      </Box>
      {isNextLoading && <ShowListLoading />}
    </Box>
  );
}

export function ShowListLoading() {
  return (
    <>
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={5} />
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={2} />
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={4} isLast />
    </>
  );
}
