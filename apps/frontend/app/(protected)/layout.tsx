import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { AuthSessionProvider } from 'app/providers/auth-session-provider';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';
import ProtectedClientLayout from './client-layout';

export default async function MainLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOption);

  return (
    <AuthSessionProvider session={session}>
      <ProtectedClientLayout>{children}</ProtectedClientLayout>
    </AuthSessionProvider>
  );
}
