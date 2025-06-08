'use client';

import { useAuth } from 'src/hooks/use-auth';
import { useNavigator } from 'src/hooks/use-navigator';
import { notifySuccess } from 'src/hooks/use-notification';
import { ApiError } from 'src/libs/fetcher';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { SignUpParam, SignUpParamSchema } from '@repo/dto';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './signup-form.module.css';
import { Logo } from '@components/logo';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { handleApiError } from '@libs/fetcher/fetcher-util';

const ClientSignUpParamSchema = SignUpParamSchema.extend({
  passwordConfirm: z.string({ message: '비밀번호 확인을 입력해주세요.' }),
}).refine(({ password, passwordConfirm }) => password === passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
});

type ClientSignUpParam = z.infer<typeof ClientSignUpParamSchema>;

export function SignupForm() {
  const form = useForm<ClientSignUpParam>({
    resolver: zodResolver(
      SignUpParamSchema.extend({
        passwordConfirm: z.string(),
      })
    ),
  });
  const navigator = useNavigator();
  const { signup } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      form.clearErrors();

      const { passwordConfirm, ...input } = form.getValues();

      await signup(input);

      setErrorMsg('');

      notifySuccess({
        title: '회원가입 성공!',
        message: '회원가입되었습니다. 입력하신 정보로 로그인해주세요.',
      });

      navigator.moveTo.auth.login();
    } catch (error) {
      const { errorMessage } = handleApiError(error, form);

      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} mt="20vh">
      <Title ta="center" className={classes.title}>
        <Logo style={{ fontSize: 32 }} />
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        서비스 이용에 필요한 프로필 정보를 입력해주세요. <br />
        계정이 이미 있으신 경우,{' '}
        <Anchor size="sm" component="button" onClick={navigator.moveTo.auth.login}>
          로그인 페이지
        </Anchor>
        로 이동해주세요.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput
            label="닉네임"
            required
            autoFocus
            {...form.register('name')}
            error={form.formState.errors['name']?.message}
          />
          <TextInput
            label="이메일"
            mt="md"
            required
            {...form.register('email')}
            error={form.formState.errors['email']?.message}
          />
          <PasswordInput
            label="비밀번호"
            required
            mt="md"
            {...form.register('password')}
            error={form.formState.errors['password']?.message}
          />
          <PasswordInput
            label="비밀번호 확인"
            required
            mt="md"
            {...form.register('passwordConfirm')}
            error={form.formState.errors['passwordConfirm']?.message}
          />

          {errorMsg && (
            <Text c="red" size="sm" className={classes.error} mt="xl">
              {errorMsg}
            </Text>
          )}

          <Button mt="xl" fullWidth type="submit" loading={loading}>
            회원가입
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
