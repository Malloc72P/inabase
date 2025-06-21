import { Box, Flex, Loader, SimpleGrid, Title } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { ShowListItemLoading, ShowListItem } from './show-list-item';
import classes from './show-list.module.css';
export interface ShowListProps {
  shows: ShowDto[];
  isInitialLoading: boolean;
  isNextLoading: boolean;
}

export function ShowList({ shows, isInitialLoading, isNextLoading }: ShowListProps) {
  return (
    <Box className={classes.showList}>
      {isInitialLoading && !isNextLoading && <ShowListLoading />}

      {shows.map((show) => (
        <ShowListItem key={show.id} show={show} isLast={shows.indexOf(show) === shows.length - 1} />
      ))}

      {isNextLoading && (
        <Flex justify="center" align="center" gap="md" p="md" my={'lg'} h={'60px'}>
          <Loader size={'xl'} type="dots" />
        </Flex>
      )}
    </Box>
  );
}

export function ShowListLoading() {
  return (
    <>
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={5} />
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={2} />
      <ShowListItemLoading />
      <ShowListItemLoading tagCount={4} isLast />
    </>
  );
}
