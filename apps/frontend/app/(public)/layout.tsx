import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';
import { PageLinkMap } from '@libs/link-map';
import { AppShell } from '@mantine/core';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function PublicPageLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOption);

  if (session) {
    redirect(PageLinkMap.protected.main());
  }

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <MainHeader />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Section>
        <MainFooter />
      </AppShell.Section>
    </AppShell>
  );
}
