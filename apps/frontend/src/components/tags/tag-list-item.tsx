import { Box, Flex, Menu, MenuDropdown } from '@mantine/core';
import classes from './tag-list-item.module.css';
import { ShowTagBadge } from './show-badge';
import { IconButton } from '@components/buttons';
import { IconDots } from '@tabler/icons-react';
import { useNavigator } from '@hooks/use-navigator';
import { useTagMutation } from '@libs/query-client/hooks/use-tag-mutation';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider';
import { handleApiError } from '@libs/fetcher';
import { notifyError, notifySuccess } from '@hooks/use-notification';

export interface TagListItem {
  id: string;
  label: string;
  isLast?: boolean;
}

export function TagListItem({ id, label, isLast }: TagListItem) {
  const navigator = useNavigator();
  const { deleteTag } = useTagMutation();
  const setGlobalLoading = useGlobalLoadingStore((s) => s.setGlobalLoading);

  const deleteTagHandler = async () => {
    try {
      setGlobalLoading(true);
      await deleteTag({ tagId: id });
      notifySuccess({ message: `태그(${label})이(가) 삭제되었습니다.` });
    } catch (error) {
      const { errorMessage } = handleApiError(error);
      notifyError({ message: errorMessage });
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <Flex className={classes.tagListItem} data-last={isLast}>
      <ShowTagBadge tag={label} />

      <Box flex={1}></Box>

      <Menu>
        <Menu.Target>
          <IconButton variant="transparent" icon={IconDots} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => navigator.moveTo.protected.tags.edit(id)}>Edit</Menu.Item>
          <Menu.Item onClick={deleteTagHandler} color="red">
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
