'use client';

import { ShowList } from 'src/components/show';
import { useShow } from 'src/hooks/use-shows';
import { ActionIcon, Button, Container, Flex, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigator } from '@hooks/use-navigator';

export default function MainPage() {
  const { shows, isShowLoading } = useShow();
  const navigator = useNavigator();

  return (
    <Container>
      <Flex my={32} gap="xl">
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
    </Container>
  );
}
