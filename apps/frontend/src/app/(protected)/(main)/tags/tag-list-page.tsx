'use client';

import { TagListItem } from '@components/tags';
import { Box, Button, Container, Flex, ScrollArea, TextInput, Title } from '@mantine/core';
import classes from './tag-list-page.module.css';
import { useNavigator } from '@hooks/use-navigator';
import { IconButton } from '@components/buttons';
import { IconSearch } from '@tabler/icons-react';

export function TagListPage() {
  const navigator = useNavigator();

  return (
    <>
      {/* 헤더, 태그 생성 버튼 */}
      <Flex pb={16} justify={'space-between'} align={'center'}>
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
      <TextInput
        pb={'16'}
        w={'100%'}
        placeholder="찾으시는 태그의 이름을 입력해주세요"
        rightSection={
          <IconButton variant="transparent" size={'sm'} icon={IconSearch}>
            Search
          </IconButton>
        }
      />

      <Box className={classes.tagList}>
        <ScrollArea>
          <TagListItem id={'a1'} label={'Tag01'} />
          <TagListItem id={'a2'} label={'Tag02'} />
          <TagListItem id={'a3'} label={'Tag03'} />
        </ScrollArea>
      </Box>
    </>
  );
}
