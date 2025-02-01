import { PageLinkMap } from '@libs/link-map';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import PublicClientLayout from './public-client-layout';

export default async function PublicPageLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOption);

  if (session) {
    redirect(PageLinkMap.protected.main());
  }

  return <PublicClientLayout>{children}</PublicClientLayout>;
}
