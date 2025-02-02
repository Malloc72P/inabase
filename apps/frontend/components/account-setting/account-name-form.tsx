'use client';

import { FormCard } from '@components/form-card';
import { notifySuccess } from '@hooks/use-notification';
import { useProfile } from '@hooks/use-profile';
import { ProfileResult, UpdateProfileInput } from '@repo/dto';
import { Session } from 'next-auth';

export interface AccountNameFormProps {
  profile: ProfileResult;
  session: Session;
}

export function AccountNameForm({ profile, session }: AccountNameFormProps) {
  const { updateProfile } = useProfile();

  const onSubmit = async (values: UpdateProfileInput) => {
    await updateProfile({
      id: session.id,
      name: values.name,
      session,
    });

    notifySuccess({
      title: '저장 완료.',
      message: 'Display Name이 수정되었습니다.',
    });
  };

  return (
    <FormCard
      title="Display Name"
      description="다른 사용자에게 보여질 이름을 적어주세요."
      onSubmit={onSubmit}
      defaultValues={{ name: profile.name }}
      inputs={[{ name: 'name' }]}
    />
  );
}
