import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';
import { AuthSessionProvider } from 'app/providers/auth-session-provider';

export default async function MainLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    throw new Error('not authenticated');
  }

  return <AuthSessionProvider session={session}>{children}</AuthSessionProvider>;
}
