import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';
import ProtectedClientLayout from './client-layout';

export default async function MainLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    throw new Error('not authenticated');
  }

  return <ProtectedClientLayout>{children}</ProtectedClientLayout>;
}
