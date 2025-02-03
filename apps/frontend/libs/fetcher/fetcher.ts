import { FetchApiOptions } from './fetcher-interface';
import { resolveFetchOption } from './fetcher-util';
import { ApiExceptionPayload, ExceptionCode } from '@repo/exceptions';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ExceptionCode,
    public message: string
  ) {
    super(message);
  }
}

export const fetcher = async <INPUT = any, OUTPUT = any>(
  url: string,
  options?: FetchApiOptions<INPUT>
) => {
  const resolvedOption = resolveFetchOption(options);

  const response = await fetch(url, resolvedOption);

  console.log(await response.clone().json());

  if (!response.ok) {
    let apiError: ApiError | null = null;

    try {
      const { status, code, message }: ApiExceptionPayload = await response.clone().json();
      apiError = new ApiError(status, code, message);
    } catch (error) {
      apiError = new ApiError(500, 'Unknown', '알 수 없는 에러가 발생했습니다.');
    }

    throw apiError;
  }

  return response.json() as OUTPUT;
};
