'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShowMutation } from '@libs/query-client/hooks/use-show-mutation';

import { handleApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider';
import { Badge, Button, Divider, Flex, Space, TagsInput, Textarea, TextInput } from '@mantine/core';
import { CommonConstants, ShowDetailDto, UpdateShowInput, UpdateShowInputSchema } from '@repo/dto';
import { useForm } from 'react-hook-form';
import { useTags } from '@libs/query-client/hooks/use-tag';

export interface ShowDetailPageProps {
  show: ShowDetailDto;
}

export function ShowUpdatePage({ show }: ShowDetailPageProps) {
  const { tags } = useTags({
    pageIndex: 0,
    pageSize: CommonConstants.paging.tag.pageSize,
    keyword: '',
  });
  const form = useForm<UpdateShowInput>({
    resolver: zodResolver(UpdateShowInputSchema),
    defaultValues: {
      title: show.title,
      description: show.description,
      tagIds: show.tags.map((tag) => tag.label),
    },
  });
  const { updateShow } = useShowMutation();

  const navigator = useNavigator();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const onSubmit = async () => {
    const { title, description, tagIds: tagLabels } = form.getValues();
    const tagIds = tagLabels
      .map((label) => tags.find((tag) => tag.label === label)?.id)
      .filter((id): id is string => Boolean(id));

    try {
      setGlobalLoading(true);

      await updateShow({ showId: show.id, title, description, tagIds });

      notifySuccess({ message: `${title} has been updated.` });
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
          value={form.watch('tagIds')}
          onChange={(value) => {
            const nextValue = value.filter((v) => tags.some((tag) => tag.label === v));
            form.setValue('tagIds', nextValue);
          }}
          placeholder="태그를 입력해주세요"
          data={tags.map((tag) => tag.label)}
          error={form.formState.errors.tagIds?.message}
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
