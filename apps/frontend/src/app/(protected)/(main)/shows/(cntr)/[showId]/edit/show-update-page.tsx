'use client';

import { InaText } from '@components/custom-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShowMutation } from '@hooks/use-show-mutation';

import { ApiError, handleApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider';
import {
  Badge,
  Button,
  Divider,
  Flex,
  Skeleton,
  Space,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { ShowDetailDto, UpdateShowInput, UpdateShowInputSchema } from '@repo/dto';
import { useForm } from 'react-hook-form';

export interface ShowDetailPageProps {
  show: ShowDetailDto;
}

export function ShowUpdatePage({ show }: ShowDetailPageProps) {
  const form = useForm<UpdateShowInput>({
    resolver: zodResolver(UpdateShowInputSchema),
    defaultValues: {
      title: show.title,
      description: show.description,
      tags: show.tags,
    },
  });
  const { updateShow } = useShowMutation();

  const navigator = useNavigator();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const onSubmit = async () => {
    const data = form.getValues();

    try {
      setGlobalLoading(true);

      await updateShow({ showId: show.id, ...data });

      notifySuccess({ message: `${data.title} has been updated.` });
      navigator.moveTo.protected.shows.list();
    } catch (error) {
      const { errorMessage } = handleApiError(error, form);
      notifyError({ message: errorMessage });
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex align={'center'} mb={16}>
        <TextInput
          w={'80%'}
          {...form.register('title')}
          error={form.formState.errors.title?.message}
        />

        <Space style={{ flexGrow: 1 }} />
      </Flex>

      <Flex gap={'md'} mb={32}>
        <TagsInput
          value={form.watch('tags')}
          onChange={(value) => form.setValue('tags', value)}
          error={form.formState.errors.tags?.message}
        />
      </Flex>

      <Divider my={32} />

      <Textarea
        resize="vertical"
        autosize
        minRows={10}
        {...form.register('description')}
        error={form.formState.errors.description?.message}
      />

      {form.formState.errors.root?.message && (
        <Flex mt={16} justify={'center'}>
          <Badge color="red" variant="filled">
            {form.formState.errors.root.message}
          </Badge>
        </Flex>
      )}

      <Flex gap={'lg'} mt={32} justify={'end'}>
        <Button variant="default" onClick={() => navigator.moveTo.protected.shows.list()}>
          Cancel
        </Button>
        <Button type="submit">Update Show</Button>
      </Flex>
    </form>
  );
}
