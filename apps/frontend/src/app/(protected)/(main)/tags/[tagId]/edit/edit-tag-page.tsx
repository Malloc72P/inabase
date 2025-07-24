'use client';

import { Box, Button, Flex, TextInput, Title } from '@mantine/core';

export function EditTagPage() {
  return (
    <>
      <Title pb={'md'}>Edit Tag</Title>

      <Box pb={'md'}>
        <TextInput label="Tag Name" placeholder="Enter tag name" />
      </Box>

      <Flex justify={'end'}>
        <Button onClick={() => {}}>Save</Button>
      </Flex>
    </>
  );
}
