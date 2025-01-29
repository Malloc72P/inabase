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
import { SignInParam, SignUpParam } from '@repo/dto';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import classes from './signup-form.module.css';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useNavigator } from '@hooks/use-navigator';
import { ApiError } from '@libs/fetcher';
import { createSubmitHandler } from '@libs/form/createSubmitHandler';

export function SignupForm() {
  const form = useForm<SignUpParam & { passwordConfirm: string }>();
  const navigator = useNavigator();
  const { signup } = useAuth();

  const onSubmit = (e: FormEvent) =>
    createSubmitHandler({
      e,
      callback: async () => {
        const { passwordConfirm, ...input } = form.getValues();

        if (input.password !== passwordConfirm) {
          notifyError({
            title: '회원가입 실패!',
            message: '패스워드가 일치하지 않습니다. 다시 확인해주세요.',
          });
        }

        await signup(input);

        notifySuccess({
          title: '회원가입 성공!',
          message: '회원가입되었습니다. 입력하신 정보로 로그인해주세요.',
        });

        navigator.moveTo.auth.login();
      },
    });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        회원가입
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        서비스 이용에 필요한 프로필 정보를 입력해주세요.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput label="닉네임" required {...form.register('name')} />
          <TextInput label="이메일" mt="md" required {...form.register('email')} />
          <PasswordInput label="비밀번호" required mt="md" {...form.register('password')} />
          <PasswordInput
            label="비밀번호 확인"
            required
            mt="md"
            {...form.register('passwordConfirm')}
          />

          <Button mt="xl" fullWidth type="submit">
            Create Account
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
