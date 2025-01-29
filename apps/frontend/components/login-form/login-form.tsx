'use client';

import { useAuth } from '@hooks/use-auth';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { SignInParam } from '@repo/dto';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import classes from './login-form.module.css';
import { useNavigator } from '@hooks/use-navigator';

export function LoginForm() {
  const { login } = useAuth();
  const form = useForm<SignInParam>();
  const navigator = useNavigator();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await login(form.getValues());
  };

  const onCreateAccountClick = () => {
    navigator.moveTo.auth.signup();
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={onCreateAccountClick}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput label="Email" required {...form.register('email')} />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.register('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
