'use client';

import { AccountNameForm } from '@components/account-setting';
import { FormLoading } from '@components/form-card/form-card-skeleton';
import { useProfile } from '@hooks/use-profile';
import { Container } from '@mantine/core';

export default function Page() {
  const { profile, isProfileLoading } = useProfile();

  if (!isProfileLoading && !profile) {
    throw new Error('no profile');
  }

  if (isProfileLoading) {
    return (
      <Container>
        <FormLoading />
      </Container>
    );
  }

  return <Container>{profile && <AccountNameForm profile={profile} />}</Container>;
}
