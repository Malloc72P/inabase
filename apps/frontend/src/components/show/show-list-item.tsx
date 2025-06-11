import { cn } from 'src/libs/ui';
import {
  Card,
  Group,
  Skeleton,
  Badge,
  Text,
  Flex,
  Button,
  ActionIcon,
  TextInput,
  Box,
  TagsInput,
} from '@mantine/core';
import classes from './show-list-item.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useShow } from '@hooks/use-shows';
import { ShowDto, UpdateShowInput, UpdateShowInputSchema } from '@repo/dto';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { ApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider/global-loading-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ShowListItemProps {
  show: ShowDto;
}

export function ShowListItemLoading() {
  return (
    <Card
      className={cn('show-list-item-skeleton', classes.show)}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Flex justify="space-between" direction="column" gap="xs">
        <Skeleton w="100%" h={20} />
        <Skeleton w={50} h={20} />
      </Flex>
    </Card>
  );
}

export function ShowListItem({ show }: ShowListItemProps) {
  const [hover, setHover] = useState<boolean>(false);
  const { updateShow, deleteShow } = useShow();
  const { setGlobalLoading } = useGlobalLoadingStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<UpdateShowInput>({
    resolver: zodResolver(UpdateShowInputSchema),
    defaultValues: {
      title: show.title,
      tags: show.tags,
    },
  });

  const onUpdateFormSubmit = async () => {
    try {
      setIsUpdating(true);
      await updateShow(show.id, form.getValues());

      notifySuccess({ message: `${show.title} 이(가) 수정되었습니다.` });
      setIsEditMode(false);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Failed to update show:', error);
      notifyError({ message: apiError.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const onDeleteBtnClicked = async () => {
    try {
      setGlobalLoading(true);
      await deleteShow(show.id);

      notifySuccess({ message: `${show.title} 이(가) 삭제되었습니다.` });
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Failed to delete show:', error);
      notifyError({ message: apiError.message });
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onUpdateFormSubmit)}>
      <Card
        className={cn('show-list-item', classes.show)}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <Flex justify="space-between" direction="column" gap={isEditMode ? 'md' : 'xs'}>
          {/* First Row */}
          <Flex>
            {isEditMode ? (
              <TextInput
                w={'100%'}
                maw={'300px'}
                {...form.register('title')}
                error={form.formState.errors['title']?.message}
              />
            ) : (
              <Text fw="bold">{show.title}</Text>
            )}
            <span style={{ flexGrow: 1 }}></span>
            {!isEditMode && (
              <Group>
                <ActionIcon
                  variant="transparent"
                  color="gray"
                  onClick={() => setIsEditMode((prev) => !prev)}
                  style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}
                >
                  <IconEdit strokeWidth={1.5}></IconEdit>
                </ActionIcon>
                <ActionIcon
                  variant="transparent"
                  color="gray"
                  onClick={onDeleteBtnClicked}
                  style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}
                >
                  <IconTrash strokeWidth={1.5}></IconTrash>
                </ActionIcon>
              </Group>
            )}
          </Flex>

          {/* Second Row */}
          <Box>
            {isEditMode ? (
              <TagsInput
                value={form.watch('tags')}
                onChange={(value) => form.setValue('tags', value)}
                error={form.formState.errors['tags']?.message}
              />
            ) : (
              <TagView tags={show.tags} />
            )}
          </Box>

          {/* Third Row */}
          {isEditMode && (
            <Flex justify="end" align="center" gap="lg">
              <Button variant="default" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={isUpdating}>
                Update
              </Button>
            </Flex>
          )}
        </Flex>
      </Card>
    </form>
  );
}

export function TagView({ tags }: { tags: string[] }) {
  return (
    <Group>
      {tags.map((tag) => (
        <Badge key={tag} variant="light">
          {tag}
        </Badge>
      ))}
    </Group>
  );
}
