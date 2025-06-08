'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError } from '@hooks/use-notification';
import { useShow } from '@hooks/use-shows';
import { handleApiError } from '@libs/fetcher/fetcher-util';
import { Box, Button, Container, Flex, TagsInput, TextInput, Title } from '@mantine/core';
import { CreateShowInput, CreateShowInputSchema } from '@repo/dto';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateShowPage() {
  const navigator = useNavigator();
  const { createShow } = useShow();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateShowInput>({
    resolver: zodResolver(CreateShowInputSchema),
    disabled: loading,
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data: CreateShowInput) => {
    try {
      setLoading(true);
      await createShow(data);
      form.reset();
      navigator.moveTo.protected.shows();
    } catch (error) {
      const { errorMessage } = handleApiError(error, form);
      notifyError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box my={32}>
        <Title size={24}>Create New Show</Title>
      </Box>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box mb={16}>
          <TextInput
            id="title"
            autoFocus
            label="Add a title"
            type="text"
            placeholder="Enter show title"
            {...form.register('title')}
            error={form.formState.errors.title?.message}
            required
          />
        </Box>

        <Box mb={16}>
          <TagsInput
            id="tags"
            label="Add tags"
            type="text"
            placeholder="Enter tags"
            {...form.register('tags', { onChange: undefined })}
            value={form.watch('tags') || []}
            onChange={(value) => form.setValue('tags', value)}
            error={form.formState.errors.tags?.message}
          />
        </Box>

        <Flex justify="flex-end" gap="lg" my={32}>
          <Button
            variant="default"
            onClick={() => {
              navigator.moveTo.protected.shows();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Show
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
