'use client';

import { IconButton } from '@components/buttons';
import { useNavigator } from '@hooks/use-navigator';
import { Box, Button, Flex, TextInput } from '@mantine/core';
import { FindShowsInput } from '@repo/dto';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShowList } from 'src/components/show';
import { useShows } from 'src/hooks/use-shows';

export default function ShowListPage() {
  const form = useForm<FindShowsInput>({
    defaultValues: {
      keyword: '',
    },
  });
  const [keyword, setKeyword] = useState('');
  const { shows, isShowLoading } = useShows({ keyword });
  const navigator = useNavigator();

  const onSearchSubmit = async () => {
    console.log('Search submitted:', form.getValues());

    setKeyword(form.getValues().keyword || '');
  };

  return (
    <Box pb={300}>
      <Flex mb={32} gap="xl">
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
      <ShowList shows={shows} isShowLoading={isShowLoading} />
    </Box>
  );
}
