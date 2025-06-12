import { Box, SimpleGrid, Title } from '@mantine/core';
import { ShowDto } from '@repo/dto';
import { ShowListItemLoading, ShowListItem } from './show-list-item';
import classes from './show-list.module.css';
export interface ShowListProps {
  shows: ShowDto[];
  isShowLoading: boolean;
}

export function ShowList({ shows, isShowLoading }: ShowListProps) {
  return (
    <Box className={classes.showList}>
      {isShowLoading && <ShowListLoading />}

      {!isShowLoading &&
        shows.map((show) => (
          <ShowListItem
            key={show.id}
            show={show}
            isLast={shows.indexOf(show) === shows.length - 1}
          />
        ))}
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
      <ShowListItemLoading tagCount={4} />
    </>
  );
}
