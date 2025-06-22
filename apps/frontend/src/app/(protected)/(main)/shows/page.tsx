'use client';

import { IconButton } from '@components/buttons';
import { useNavigator } from '@hooks/use-navigator';
import { useScrolled } from '@hooks/use-scrolled';
import { Box, Button, Container, Flex, Loader, ScrollArea, Space, TextInput } from '@mantine/core';
import { FindShowsInput } from '@repo/dto';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShowList, ShowListItem, ShowListLoading } from 'src/components/show';
import { useShows } from 'src/hooks/use-shows';
import classes from './page.module.css';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function ShowListPage() {
  const form = useForm<FindShowsInput>({
    defaultValues: {
      keyword: '',
    },
  });
  const { scrollRef, isBottom, isScrolled, watchScroll } = useScrolled();
  const [keyword, setKeyword] = useState('');
  const navigator = useNavigator();
  const { shows, isShowLoading, isInitialLoading, isNextLoading, hasNextPage, fetchNextPage } =
    useShows({
      keyword,
      isBottom,
    });

  const rowVirtualizer = useVirtualizer({
    count: shows.length,
    getScrollElement: () => scrollRef?.current,
    estimateSize: () => 133.3,
  });

  const onSearchSubmit = async () => {
    setKeyword(form.getValues().keyword || '');
  };

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
        <Flex gap="xl" pos={'sticky'} top={0} bg="white" py={32}>
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
          />
          <Space py={32} />
        </Container>
      </ScrollArea>
    </Flex>
  );
}
