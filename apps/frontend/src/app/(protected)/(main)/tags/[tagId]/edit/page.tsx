import { findTagsApi } from '@libs/fetcher/tags';
import { EditTagPage } from './tag-edit-page';
import { findTagApi } from '@libs/fetcher/tags/find-show.api';
import { getServerSession, getTokens } from 'src/app/get-server-session';

interface CreatePageProps {
  params: Promise<{
    tagId: string;
  }>;
}

export default async function CreatePage({ params }: CreatePageProps) {
  const { tagId } = await params;
  const tokens = await getTokens();
  const { tag } = await findTagApi({ tagId }, tokens);

  return (
    <>
      <EditTagPage tag={tag} />
    </>
  );
}
