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
      <Container>준비중입니다...</Container>
    </div>
  );
}
