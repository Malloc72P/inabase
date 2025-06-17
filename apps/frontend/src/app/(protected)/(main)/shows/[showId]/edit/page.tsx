import { findShowApi } from '@libs/fetcher/shows/find-show.api';
import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { getTokens } from 'src/app/get-server-session';
import { ShowUpdatePage } from './show-update-page';

export interface PageProps {
  params: Promise<{
    showId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { showId } = await params;

  return (
    <>
      <Suspense fallback={<LoadingOverlay visible={true} />}>
        <GetShowDetail showId={showId} />
      </Suspense>
    </>
  );
}

export async function GetShowDetail({ showId }: { showId: string }) {
  const { show } = await findShowApi({ showId }, await getTokens());

  return <ShowUpdatePage show={show} />;
}
