'use client';

import { ShowListItem, ShowListItemSkeleton } from '@components/show-list-item';
import { useShow } from '@hooks/useShows';
import { Container, SimpleGrid } from '@mantine/core';

export default function Home() {
  const { shows, isShowLoading } = useShow();

  return (
    <div>
      <Container>
        <SimpleGrid spacing="lg" cols={3}>
          {isShowLoading ? (
            <>
              <ShowListItemSkeleton />
              <ShowListItemSkeleton />
              <ShowListItemSkeleton />
            </>
          ) : (
            shows.map((show) => <ShowListItem key={show.id} title={show.title} tags={show.tags} />)
          )}
        </SimpleGrid>
      </Container>
    </div>
  );
}
