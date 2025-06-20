'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShowMutation } from '@hooks/use-show-mutation';
import { handleApiError } from '@libs/fetcher';
import { Box, Button, Flex, TagsInput, Textarea, TextInput, Title } from '@mantine/core';
import { CreateShowInput, CreateShowInputSchema } from '@repo/dto';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateShowPage() {
  const navigator = useNavigator();
  const { createShow } = useShowMutation();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateShowInput>({
    resolver: zodResolver(CreateShowInputSchema),
    disabled: loading,
    defaultValues: {
      title: '',
      tags: [],
      description: '',
    },
  });

  const onSubmit = async (data: CreateShowInput) => {
    try {
      setLoading(true);
      await createShow(data);
      form.reset();
      notifySuccess({ message: 'Show created successfully!' });
      navigator.moveTo.protected.shows.list();
    } catch (error) {
      const { errorMessage } = handleApiError(error, form);
      notifyError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box mb={32}>
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

        <Box mb={16}>
          <Textarea
            id="tags"
            label="Add description"
            placeholder="Enter description"
            {...form.register('description', { onChange: undefined })}
            error={form.formState.errors.description?.message}
          />
        </Box>

        <Flex justify="flex-end" gap="lg" my={32}>
          <Button
            variant="default"
            onClick={() => {
              navigator.moveTo.protected.shows.list();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Show
          </Button>
        </Flex>
      </form>
    </>
  );
}
