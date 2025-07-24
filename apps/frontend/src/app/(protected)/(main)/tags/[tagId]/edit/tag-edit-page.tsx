'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { handleApiError } from '@libs/fetcher';
import { useTagMutation } from '@libs/query-client/hooks/use-tag-mutation';
import { Box, Button, Flex, TextInput, Title } from '@mantine/core';
import { TagDto, UpdateTagInput, UpdateTagInputSchema } from '@repo/dto';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface EditTagPageProps {
  tag: TagDto;
}

export function EditTagPage({ tag }: EditTagPageProps) {
  const navigator = useNavigator();
  const [loading, setLoading] = useState(false);
  const { updateTag } = useTagMutation();
  const form = useForm<UpdateTagInput>({
    resolver: zodResolver(UpdateTagInputSchema),
    defaultValues: {
      label: tag.label,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(async () => {
        try {
          const { label } = form.getValues();
          setLoading(true);
          await updateTag({ tagId: tag.id, label });

          navigator.moveTo.protected.tags.list();
          notifySuccess({ message: `태그 "${tag.label}" 이(가) "${label}"(으)로 수정되었습니다.` });
        } catch (error) {
          const { errorMessage } = handleApiError(error);
          notifyError({ message: errorMessage });
        } finally {
          setLoading(false);
        }
      })}
    >
      <Title pb={'md'}>Edit Tag</Title>

      <Box pb={'md'}>
        <TextInput label="Tag Name" placeholder="Enter tag name" {...form.register('label')} />
      </Box>

      <Flex justify={'end'}>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </Flex>
    </form>
  );
}
