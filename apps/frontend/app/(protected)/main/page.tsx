import { ShowListItem, ShowListItemSkeleton } from '@components/show-list-item';
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
          <Suspense fallback={<MainPageBodyLoading />}>
            <Shows session={session} />
          </Suspense>
        </SimpleGrid>
      </Container>
    </div>
  );
}

async function Shows({ session }: { session: Session }) {
  const { shows } = await findShows({}, { accessToken: session.backendTokens.accessToken });

  return (
    <Suspense fallback={<MainPageBodyLoading />}>
      {shows.map((show) => (
        <ShowListItem key={show.id} title={show.title} tags={show.tags} />
      ))}
    </Suspense>
  );
}

export function MainPageBodyLoading() {
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
