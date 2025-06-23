'use client';

import { IconButton } from '@components/buttons';
import { useNavigator } from '@hooks/use-navigator';
import { Button, Container, Flex, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ShowList } from 'src/components/show';
import { useShowSearchForm } from './use-show-search-form';

export default function ShowListPage() {
  const navigator = useNavigator();
  const param = useSearchParams();
  const keyword = useMemo(() => param.get('keyword') || '', [param]);
  const { form, onSearchSubmit } = useShowSearchForm();

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
      <ShowList keyword={keyword} />
    </Flex>
  );
}
