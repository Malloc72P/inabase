import { Box, Flex, Menu, MenuDropdown } from '@mantine/core';
import classes from './tag-list-item.module.css';
import { ShowTagBadge } from './show-badge';
import { IconButton } from '@components/buttons';
import { IconDots, IconDotsVertical } from '@tabler/icons-react';
import { useNavigator } from '@hooks/use-navigator';

export interface TagListItem {
  id: string;
  label: string;
}

export function TagListItem({ id, label }: TagListItem) {
  const navigator = useNavigator();

  return (
    <Flex className={classes.tagListItem}>
      <ShowTagBadge tag={label} />

      <Box flex={1}></Box>

      <Menu>
        <Menu.Target>
          <IconButton variant="transparent" icon={IconDots} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => navigator.moveTo.protected.tags.edit(id)}>Edit</Menu.Item>
          <Menu.Item onClick={() => console.log(`Delete tag ${id}`)} color="red">
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
