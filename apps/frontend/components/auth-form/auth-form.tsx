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
import classes from './auth-form.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

export function AuthForm() {
  const { login } = useAuth();
  const form = useForm<SignInParam>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await login(form.getValues());
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
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
