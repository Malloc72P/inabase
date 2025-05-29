import { Button, Group, Skeleton } from '@mantine/core';
import { ProfileResult } from '@repo/dto';
import { UserMenuDropdown } from 'src/components/user-menu';
import { useNavigator } from 'src/hooks/use-navigator';

export function PublicAuthGroup() {
  return (
    <>
      <LoginButton />
      <SignUpButton />
    </>
  );
}

export interface ProtectedAuthGroupProps {
  user: ProfileResult;
}

export function ProtectedAuthGroup({ user }: ProtectedAuthGroupProps) {
  return (
    <Group visibleFrom="sm" justify="end">
      <UserMenuDropdown profile={user} />
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
