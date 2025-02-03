import { UserMenuDropdown } from '@components/user-menu';
import { useNavigator } from '@hooks/use-navigator';
import { useProfile } from '@hooks/use-profile';
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
  const { profile, isProfileLoading } = useProfile();

  if (isProfileLoading) {
    return <HeaderAuthGroupLoading />;
  }

  return (
    <Group visibleFrom="sm" justify="end">
      {profile && <UserMenuDropdown profile={profile} />}
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
