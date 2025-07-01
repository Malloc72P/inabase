import { ApiExceptionPayload, ExceptionCode, FieldError } from '@repo/exceptions';
import { FetchApiOptions } from './fetcher-interface';
import { UseFormReturn } from 'react-hook-form';
import { ApiError } from './fetcher';

export function resolveFetchOption(options: FetchApiOptions | undefined): RequestInit {
  const { body, headers, method, accessToken, refreshToken, ...rest } = options || {};

  const isFormData = body instanceof FormData;
  const processedHeaders = { ...headers };
  const processedBody =
    body && typeof body === 'object' && !isFormData ? JSON.stringify(body) : body;

  if (!isFormData && body) {
    Reflect.set(processedHeaders, 'Content-Type', 'application/json; charset=utf-8');
  }

  if (accessToken) {
    Reflect.set(processedHeaders, 'Authorization', `bearer ${accessToken}`);
  }

  //   if (refreshToken) {
  //     Reflect.set(processedHeaders, 'Authorization', `bearer ${refreshToken}`);
  //   }

  return {
    ...rest,
    method: method ? method : 'GET',
    headers: processedHeaders,
    body: processedBody,
    credentials: 'include',
  };
}

export async function responseToJson(response: Response) {
  return await response.clone().json();
}

export async function toApiError(response: Response) {
  let apiError: ApiError | null = null;
  const defaultMessage = '알 수 없는 에러가 발생했습니다.';
  const defaultStatus = 500;
  const defaultCode: ExceptionCode = 'Unknown';
  const defaultFieldErrors: FieldError[] = [];

  try {
    const {
      status = defaultStatus,
      code = defaultCode,
      message = defaultMessage,
      fieldErrors = defaultFieldErrors,
    }: ApiExceptionPayload = await responseToJson(response);

    apiError = new ApiError(status, code, message, fieldErrors);
  } catch (error) {
    apiError = new ApiError(defaultStatus, defaultCode, defaultMessage, defaultFieldErrors);
  }

  return apiError;
}

export function handleApiError(error: unknown, form?: UseFormReturn<any>) {
  let errorMessage = '알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.';

  if (error instanceof ApiError) {
    // ApiError 인스턴스인 경우 서버에서 응답한 에러 메시지를 설정합니다.
    errorMessage = error.message;

    // fieldErrors가 존재하면 각 필드에 대한 에러를 설정합니다.
    if (error.fieldErrors && form) {
      for (const fieldError of error.fieldErrors) {
        form.setError(fieldError.field, {
          type: 'manual',
          message: fieldError.message,
        });
      }
    }
  }

  return { errorMessage };
}
