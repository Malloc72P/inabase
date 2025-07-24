'use client';

import { Box, Button, Flex, TextInput, Title } from '@mantine/core';

export function CreateTagPage() {
  return (
    <>
      <Title pb={'md'}>Create Tag</Title>

      <Box pb={'md'}>
        <TextInput label="Tag Name" placeholder="Enter tag name" />
      </Box>

      <Flex justify={'end'}>
        <Button onClick={() => {}}>Create</Button>
      </Flex>
    </>
  );
}
