'use client';

import { IconButton } from '@components/buttons';
import { useNavigator } from '@hooks/use-navigator';
import { Box, Button, Container, Flex, ScrollArea, Space, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ShowList } from 'src/components/show';
import { useShows } from 'src/hooks/use-shows';
import classes from './page.module.css';
import { useShowScroll } from './use-show-scroll';
import { useShowSearchForm } from './use-show-search-form';

export default function ShowListPage() {
  const navigator = useNavigator();
  const param = useSearchParams();
  const { form, onSearchSubmit } = useShowSearchForm();
  const { scrollRef, isBottom, isScrolled, watchScroll } = useShowScroll();

  const {
    shows,
    isShowLoading,
    isInitialLoading,
    isNextLoading,
    hasNextPage,
    fetchNextPage,
    deleteShow,
  } = useShows({
    keyword: param.get('keyword') || '',
  });

  useEffect(() => {
    if (!isBottom || isShowLoading || !hasNextPage) {
      return;
    }

    fetchNextPage();
  }, [isBottom]);

  return (
    <Flex w={'100%'} h={'calc(100vh - 109px)'} direction={'column'}>
      {/* ------ 상단 검색기 ------ */}
      <Container w={'100%'}>
        <Flex gap="xl" pos={'sticky'} top={0} py={32}>
          <form style={{ flexGrow: 1 }} onSubmit={form.handleSubmit(onSearchSubmit)}>
            <TextInput
              placeholder="검색어를 입력하세요"
              {...form.register('keyword')}
              rightSection={<IconButton type="submit" variant="transparent" icon={IconSearch} />}
            />
          </form>
          <Button
            onClick={() => {
              navigator.moveTo.protected.shows.create();
            }}
          >
            New Show
          </Button>
        </Flex>
      </Container>

      {/* ------ Show 카드 목록 ------ */}
      <ScrollArea
        viewportRef={scrollRef}
        pos={'relative'}
        style={{ overflowY: 'auto', flexGrow: 1, height: 0 }}
        onScrollPositionChange={watchScroll}
        className={classes.listContainer}
        type="auto"
        scrollHideDelay={1000}
      >
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          w={'100%'}
          right={0}
          hidden={!isScrolled}
          className={classes.scrollVisualizer}
        />
        <Container>
          <ShowList
            shows={shows}
            isInitialLoading={isInitialLoading}
            isNextLoading={isNextLoading}
            scrollRef={scrollRef}
            deleteShow={deleteShow}
          />
          <Space py={32} />
        </Container>
      </ScrollArea>
    </Flex>
  );
}
