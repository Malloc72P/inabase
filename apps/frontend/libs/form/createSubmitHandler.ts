import { notifyError } from '@hooks/use-notification';
import { ApiError } from '@libs/fetcher';
import { FormEvent } from 'react';

export interface CreateSubmitHandlerInput {
  e: FormEvent;
  callback: () => Promise<void>;
}

export async function createSubmitHandler({ e, callback }: CreateSubmitHandlerInput) {
  e.preventDefault();

  try {
    await callback();
  } catch (error) {
    if (error instanceof ApiError) {
      notifyError({
        title: '문제가 발생했습니다.',
        message: error.message,
      });
    } else {
      notifyError({
        title: '알 수 없는 문제가 발생했습니다.',
        message: '문제가 계속되면 관리자에게 문의해주세요.',
      });
    }
  }
}
