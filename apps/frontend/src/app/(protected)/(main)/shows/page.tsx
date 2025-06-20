'use client';

import { IconButton } from '@components/buttons';
import { useNavigator } from '@hooks/use-navigator';
import { useScrolled } from '@hooks/use-scrolled';
import { Box, Button, Container, Divider, Flex, ScrollArea, Space, TextInput } from '@mantine/core';
import { FindShowsInput } from '@repo/dto';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShowList } from 'src/components/show';
import { useShows } from 'src/hooks/use-shows';
import classes from './page.module.css';

export default function ShowListPage() {
  const form = useForm<FindShowsInput>({
    defaultValues: {
      keyword: '',
    },
  });
  const { isScrolled, watchScroll } = useScrolled();
  const [keyword, setKeyword] = useState('');
  const { shows, isShowLoading } = useShows({ keyword });
  const navigator = useNavigator();

  const onSearchSubmit = async () => {
    console.log('Search submitted:', form.getValues());

    setKeyword(form.getValues().keyword || '');
  };

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
        pos={'relative'}
        style={{ overflowY: 'auto', flexGrow: 1, height: 0 }}
        onScrollPositionChange={watchScroll}
        className={classes.listContainer}
      >
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          w={'100%'}
          right={0}
          hidden={!isScrolled}
          className={classes.scrollVisualizer}
        ></Box>
        <Container>
          <ShowList shows={shows} isShowLoading={isShowLoading} />

          <Space py={32} />
        </Container>
      </ScrollArea>
    </Flex>
  );
}
