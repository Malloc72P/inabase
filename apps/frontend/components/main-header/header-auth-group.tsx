import { UserMenu } from '@components/user-menu';
import { useNavigator } from '@hooks/use-navigator';
import { Group, Button, Skeleton } from '@mantine/core';
import { useSession } from 'next-auth/react';

export function PublicAuthGroup() {
  return (
    <Group visibleFrom="sm" w={200} justify="end">
      <LoginButton />
      <SignUpButton />
    </Group>
  );
}

export function ProtectedAuthGroup() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <HeaderAuthGroupLoading />;
  }

  return (
    <Group visibleFrom="sm" w={200} justify="end">
      {session ? (
        <>
          <UserMenu session={session} />
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
    <Button variant="default" onClick={navigator.moveTo.auth.login}>
      Log in
    </Button>
  );
}

export function SignUpButton() {
  const navigator = useNavigator();

  return <Button>Sign up</Button>;
}

export function HeaderAuthGroupLoading() {
  return (
    <Group gap="md" w={200}>
      <Skeleton w={76} h={35}></Skeleton>
      <Skeleton w={86} h={35}></Skeleton>
    </Group>
  );
}
