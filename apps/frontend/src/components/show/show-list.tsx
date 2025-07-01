import { Box, Container, ScrollArea, Space } from '@mantine/core';
import { ShowListItem, ShowListItemEmptyView, ShowListItemLoading } from './show-list-item';

import { useShowScroll } from '@components/show/use-show-scroll';
import { ShowDto } from '@repo/dto';
import { useEffect, useMemo } from 'react';
import classes from './show-list.module.css';
import { useShowsVirtualizer } from './use-shows-virtualizer';
export interface ShowListProps {
  keyword: string;
  shows: ShowDto[];
  isShowLoading: boolean;
  isInitialLoading: boolean;
  isNextLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function ShowList({
  keyword,
  shows,
  isShowLoading,
  isInitialLoading,
  isNextLoading,
  hasNextPage,
  fetchNextPage,
}: ShowListProps) {
  //-------------------------------------------------------------------------
  // DataList State
  //-------------------------------------------------------------------------
  const isEmpty = useMemo(
    () => shows.length === 0 && !isInitialLoading && !isNextLoading,
    [shows, isInitialLoading, isNextLoading]
  );

  //-------------------------------------------------------------------------
  // Show Scroll
  //-------------------------------------------------------------------------
  const { scrollRef, isBottom, isScrolled, watchScroll, restoreScroll, restoreLock } =
    useShowScroll({
      keyword,
    });

  //-------------------------------------------------------------------------
  // Row Virtualizer
  //-------------------------------------------------------------------------
  const { rowVirtualizer } = useShowsVirtualizer({ shows, scrollRef });

  //-------------------------------------------------------------------------
  // Refetch By Scroll
  //-------------------------------------------------------------------------
  useEffect(() => {
    if (!isBottom || isShowLoading || !hasNextPage) return;

    fetchNextPage();
  }, [isBottom]);

  //-------------------------------------------------------------------------
  // Restore Scroll
  //-------------------------------------------------------------------------
  useEffect(() => {
    // isEmpty가 true인 경우, restoreLock을 true로 설정하여 스크롤 복원을 방지한다.
    if (isEmpty) restoreLock.current = true;
    if (restoreLock.current || rowVirtualizer.getTotalSize() === 0) return;

    // rowVirtualizer가 준비되면 이전 스크롤을 복원한다. 해당 작업은 단 한번만 수행한다.
    restoreLock.current = true;
    restoreScroll();
  }, [rowVirtualizer.getTotalSize(), isEmpty]);

  return (
    <ScrollArea
      id="ina-show-list-scroll-area"
      viewportRef={scrollRef}
      pos={'relative'}
      style={{ overflowY: 'auto', flexGrow: 1, height: 0 }}
      onScrollPositionChange={watchScroll}
      className={classes.listContainer}
      classNames={{
        viewport: 'scroll-viewport',
      }}
      type="auto"
      scrollHideDelay={1000}
    >
      {/* 스크롤이 적용된 경우, 스크롤 컨테이너 맨 위에 그림자 효과를 주어, 어색하게 스크롤되는 것을 방지한다. */}
      <Box
        pos={'absolute'}
        top={0}
        left={0}
        w={'100%'}
        right={0}
        hidden={!isScrolled}
        className={classes.scrollVisualizer}
      />
      {/* 가로 너비를 제한하기 위한 Container. 스크롤 컨테이너는 페이지 전체 너비를 차지하기 위해, 이곳에서 제한한다. */}
      <Container>
        {isInitialLoading && !isNextLoading && <ShowListLoading />}
        {isEmpty && <ShowListItemEmptyView />}
        {/* 가상 스크롤 높이를 가지는 요소. 전체 데이터 크기(getTotalSize)만큼 height를 가진다. */}
        <Box
          id="ina-show-list"
          pos={'relative'}
          className={classes.showList}
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((vRow, index, vRows) => {
            const show = shows[vRow.index];

            if (!show) {
              return null;
            }

            return (
              <ShowListItem
                key={show.id}
                show={show}
                isLast={index === vRows.length - 1}
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
      </Container>
      <Space py={32} />
    </ScrollArea>
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
