'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { handleApiError } from '@libs/fetcher';
import { useTagMutation } from '@libs/query-client/hooks/use-tag-mutation';
import { Box, Button, Flex, TextInput, Title } from '@mantine/core';
import { CreateTagInput, CreateTagInputSchema } from '@repo/dto';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function CreateTagPage() {
  const [loading, setLoading] = useState(false);
  const { createTag } = useTagMutation();
  const navigator = useNavigator();
  const form = useForm<CreateTagInput>({
    resolver: zodResolver(CreateTagInputSchema),
    defaultValues: {
      label: '',
    },
  });

  const submitHandler = async () => {
    try {
      setLoading(true);
      const { label } = form.getValues();

      await createTag({ label });

      navigator.moveTo.protected.tags.list();
      notifySuccess({ message: `태그(${label})이(가) 생성되었습니다.` });
    } catch (error) {
      const { errorMessage } = handleApiError(error, form);
      notifyError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <Title pb={'md'}>Create Tag</Title>

      <Box pb={'md'}>
        <TextInput label="Tag Name" placeholder="Enter tag name" {...form.register('label')} />
      </Box>

      <Flex justify={'end'}>
        <Button type="submit" loading={loading}>
          Create
        </Button>
      </Flex>
    </form>
  );
}
