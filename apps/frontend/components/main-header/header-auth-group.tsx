import { UserMenuDropdown } from '@components/user-menu';
import { useNavigator } from '@hooks/use-navigator';
import { Group, Button, Skeleton } from '@mantine/core';
import { useSession } from 'next-auth/react';

export function AuthGroup() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <HeaderAuthGroupLoading />;
  }

  return (
    <Group visibleFrom="sm" justify="end">
      {session ? (
        <>
          <UserMenuDropdown session={session} />
        </>
      ) : (
        <>
          <LoginButton />
          <SignUpButton />
        </>
      )}
    </Group>
  );
}

export function LoginButton() {
  const navigator = useNavigator();

  return (
    <Button variant="default" h={34} onClick={navigator.moveTo.auth.login}>
      Log in
    </Button>
  );
}

export function SignUpButton() {
  const navigator = useNavigator();

  return (
    <Button h={34} onClick={navigator.moveTo.auth.signup}>
      Sign up
    </Button>
  );
}

export function HeaderAuthGroupLoading() {
  return (
    <Group gap="md">
      <Skeleton w={76} h={34}></Skeleton>
      <Skeleton w={86} h={34}></Skeleton>
    </Group>
  );
}
