import { Title } from '@mantine/core';
import { ShowDetailPage } from './show-detail-page';

export interface PageProps {
  params: Promise<{
    showId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { showId } = await params;

  return <ShowDetailPage showId={showId} />;
}
