import { Box } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { Rect, useVirtualizer, Virtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { ShowListItem, ShowListItemEmptyView, ShowListItemLoading } from './show-list-item';

import classes from './show-list.module.css';
import { useShows } from '@hooks/use-shows';
import { useEffect, useLayoutEffect } from 'react';
export interface ShowListProps {
  shows: ShowDto[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isInitialLoading: boolean;
  isNextLoading: boolean;
  deleteShow: ReturnType<typeof useShows>['deleteShow'];
}

export function ShowList({
  shows,
  isInitialLoading,
  isNextLoading,
  scrollRef,
  deleteShow,
}: ShowListProps) {
  const rowVirtualizer = useVirtualizer({
    enabled: !!scrollRef.current,
    count: shows.length,
    getScrollElement: () => scrollRef?.current,
    estimateSize: () => 133.3,
    overscan: 20,
  });

  useEffect(() => {
    // paint 이후에 실행되므로, 이 시점엔 ref에 DOM 노드가 연결된 상태이다.
    const init = () => {
      if (!scrollRef.current) {
        // 만약 scrollRef가 아직 연결되지 않은 상태라면, 다음 프레임에 다시 시도한다.
        requestAnimationFrame(init);
        return;
      }

      rowVirtualizer.setOptions({
        ...rowVirtualizer.options,
        getScrollElement: () => scrollRef.current as HTMLDivElement,
      });
      rowVirtualizer.measure();
    };

    init();
  }, []);

  return (
    <Box>
      {isInitialLoading && !isNextLoading && <ShowListLoading />}
      {shows.length === 0 && !isInitialLoading && !isNextLoading && <ShowListItemEmptyView />}
      <Box
        id="ina-show-list"
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
              deleteShow={deleteShow}
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
