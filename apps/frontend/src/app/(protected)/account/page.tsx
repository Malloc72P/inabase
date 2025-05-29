'use client';

import { AccountNameForm } from 'src/components/account-setting';
import { Container } from '@mantine/core';
import { ProfileContext } from '@components/auth-session-provider';
import { useContext } from 'react';

export default function Page() {
  const { profile } = useContext(ProfileContext);

  return (
    <Container>
      <AccountNameForm profile={profile} />
    </Container>
  );
}
