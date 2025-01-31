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
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './login-form.module.css';
import { useNavigator } from '@hooks/use-navigator';
import { submitHandler } from '@libs/form/createSubmitHandler';
import { ApiError } from '@libs/fetcher';
import { IconCircleCheck } from '@tabler/icons-react';

export function LoginForm() {
  const { login } = useAuth();
  const form = useForm<SignInParam>();
  const navigator = useNavigator();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (e: FormEvent) =>
    submitHandler({
      e,
      callback: async () => {
        try {
          setLoading(true);
          await login(form.getValues());
          setErrorMsg('');
          setIsSuccess(true);
          navigator.moveTo.protected.main();
        } catch (error) {
          setIsSuccess(false);
          if (error instanceof ApiError) {
            setErrorMsg(error.message);
          }
          throw error;
        } finally {
          setLoading(false);
        }
      },
    });

  const onCreateAccountClick = () => {
    navigator.moveTo.auth.signup();
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        환영합니다!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        아직 계정이 없으신가요?{' '}
        <Anchor size="sm" component="button" onClick={onCreateAccountClick}>
          회원가입 하기
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput label="이메일" required {...form.register('email')} />
          <PasswordInput label="비밀번호" required mt="md" {...form.register('password')} />

          {errorMsg && (
            <Text c="red" size="sm" className={classes.error} mt="xl">
              {errorMsg}
            </Text>
          )}
          {isSuccess && (
            <Group gap={5} mt="xl">
              <IconCircleCheck color="green" />
              <Text fw="bold" c="green" size="sm">
                로그인 성공!
              </Text>
            </Group>
          )}

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            로그인
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
