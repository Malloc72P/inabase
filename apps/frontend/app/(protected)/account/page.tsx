import { AccountNameForm } from '@components/account-setting';
import { FormSkeleton } from '@components/form-card/form-card-skeleton';
import { ApiError } from '@libs/fetcher';
import { getProfile } from '@libs/server-actions/auth';
import { Container } from '@mantine/core';
import { nextAuthOption } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Container>
      <Suspense fallback={<FormSkeleton />}>
        <ServerDisplayNameForm />
      </Suspense>
    </Container>
  );
}

async function ServerDisplayNameForm() {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    throw new ApiError(401, 'TokenExpired', '토큰이 만료되었습니다. 다시 로그인해주세요.');
  }

  const profile = await getProfile(session);

  return <AccountNameForm profile={profile} session={session} />;
}
