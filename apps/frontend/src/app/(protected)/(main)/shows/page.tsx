'use client';

import { useNavigator } from '@hooks/use-navigator';
import { ActionIcon, Box, Button, Flex, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ShowList } from 'src/components/show';
import { useShows } from 'src/hooks/use-shows';

export default function MainPage() {
  const { shows, isShowLoading } = useShows();
  const navigator = useNavigator();

  return (
    <Box pb={300}>
      <Flex mb={32} gap="xl">
        <TextInput
          style={{ flexGrow: 1 }}
          rightSection={
            <ActionIcon variant="transparent" color="gray">
              <IconSearch stroke={1.5}></IconSearch>
            </ActionIcon>
          }
        />
        <Button
          onClick={() => {
            navigator.moveTo.protected.createShow();
          }}
        >
          New Show
        </Button>
      </Flex>
      <ShowList shows={shows} isShowLoading={isShowLoading} />
    </Box>
  );
}
