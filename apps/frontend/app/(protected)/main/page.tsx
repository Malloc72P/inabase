import { ShowListItemSkeleton } from '@components/show-list-item';
import { findShows } from '@libs/api/show';
import { Container, SimpleGrid } from '@mantine/core';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession, Session } from 'next-auth';
import { Suspense } from 'react';
import { MainPageBody } from './main-page-body';

export default async function MainPage() {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    return;
  }

  return (
    <div>
      <Container>
        <SimpleGrid spacing="lg" cols={3}>
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
      <MainPageBody shows={shows} />
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
