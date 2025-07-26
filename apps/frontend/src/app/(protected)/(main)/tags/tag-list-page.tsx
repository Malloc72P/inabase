'use client';

import { IconButton } from '@components/buttons';
import { TagListItem } from '@components/tags';
import { useNavigator } from '@hooks/use-navigator';
import { useTags } from '@libs/query-client/hooks/use-tags';
import { Box, Button, Flex, ScrollArea, TextInput, Title } from '@mantine/core';
import { CommonConstants } from '@repo/dto';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import classes from './tag-list-page.module.css';

export function TagListPage() {
  const params = useSearchParams();
  const navigator = useNavigator();
  const { pageIndex, keyword } = useMemo(() => {
    const pageIndex = Number(params.get('pageIndex')) || 0;
    const keyword = params.get('keyword') || '';

    return { pageIndex, keyword };
  }, [params]);
  const { data } = useTags({
    pageIndex,
    pageSize: CommonConstants.paging.tag.pageSizeMd,
    keyword,
  });

  const paging = useMemo(() => {
    const totalCount = Number(data?.total);
    const pageSize = CommonConstants.paging.tag.pageSizeMd;
    const totalPages = Math.ceil(totalCount / pageSize);

    const start = 1;
    const end = totalPages;
    const currentPageSize = end - start + 1;
    const pages = Array.from({ length: currentPageSize }, (_, i) => start + i);

    return {
      pageIndex,
      totalCount,
      totalPages,
      start,
      end,
      pages,
    };
  }, [pageIndex, data]);

  const [searchInput, setSearchInput] = useState('');

  return (
    <Box pb={200}>
      {/* 헤더, 태그 생성 버튼 */}
      <Flex pb={'md'} justify={'space-between'} align={'center'}>
        <Title>Tags</Title>
        <Button
          onClick={() => {
            navigator.moveTo.protected.tags.create();
          }}
        >
          New Tag
        </Button>
      </Flex>

      {/* 태그 검색기 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigator.moveTo.protected.tags.list({
            keyword: searchInput,
            pageIndex: 0,
            pageSize: CommonConstants.paging.tag.pageSizeMd,
          });
        }}
      >
        <TextInput
          pb={'md'}
          w={'100%'}
          placeholder="찾으시는 태그의 이름을 입력해주세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          rightSection={
            <IconButton variant="transparent" size={'sm'} icon={IconSearch}>
              Search
            </IconButton>
          }
        />
      </form>

      <Box mb={'md'} className={classes.tagList}>
        <ScrollArea>
          {data?.tags.map((tag, i) => (
            <TagListItem
              key={tag.id}
              id={tag.id}
              label={tag.label}
              isLast={i === data?.tags.length - 1}
            />
          ))}
        </ScrollArea>
      </Box>

      <Flex justify={'center'} gap={'sm'}>
        {paging.pages.map((currentIndex) => (
          <Button
            key={currentIndex}
            variant={paging.pageIndex === currentIndex - 1 ? 'filled' : 'default'}
            onClick={() => {
              navigator.moveTo.protected.tags.list({
                keyword,
                pageIndex: currentIndex - 1,
                pageSize: CommonConstants.paging.tag.pageSizeMd,
              });
            }}
          >
            {currentIndex}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
