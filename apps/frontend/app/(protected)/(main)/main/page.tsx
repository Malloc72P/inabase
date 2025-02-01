import { ShowListItem, ShowListItemSkeleton } from '@components/show-list-item';
import { sleep } from '@libs/debug';
import { findShows } from '@libs/server-actions/show';
import { Container, SimpleGrid } from '@mantine/core';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession, Session } from 'next-auth';
import { Suspense } from 'react';

export default async function MainPage() {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    return;
  }

  return (
    <div>
      <Container>
        <SimpleGrid
          spacing="lg"
          cols={{
            md: 3,
            sm: 1,
          }}
        >
          <Suspense fallback={<ShowListLoading />}>
            <Shows session={session} />
          </Suspense>
        </SimpleGrid>
      </Container>
    </div>
  );
}

async function Shows({ session }: { session: Session }) {
  const { shows } = await findShows({}, { accessToken: session.backendTokens.accessToken });

  return shows.map((show) => <ShowListItem key={show.id} title={show.title} tags={show.tags} />);
}

export function ShowListLoading() {
  return (
    <>
      <ShowListItemSkeleton />
      <ShowListItemSkeleton />
      <ShowListItemSkeleton />
      <ShowListItemSkeleton />
      <ShowListItemSkeleton />
      <ShowListItemSkeleton />
    </>
  );
}
