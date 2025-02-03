import { useNavigator } from '@hooks/use-navigator';
import { Button, Group, Skeleton } from '@mantine/core';

export function PublicAuthGroup() {
  return (
    <>
      <LoginButton />
      <SignUpButton />
    </>
  );
}

export function ProtectedAuthGroup() {
  //   if (sessionStatus === 'loading') {
  //     return <HeaderAuthGroupLoading />;
  //   }

  return (
    <Group visibleFrom="sm" justify="end">
      {/* {session && <UserMenuDropdown session={session} />} */}
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
