import { ExceptionCode, FieldError } from '@repo/exceptions';
import { FetchApiOptions } from './fetcher-interface';
import { resolveFetchOption, responseToJson, toApiError } from './fetcher-util';
import { refreshToken } from './refresh-token';

/**
 * ApiError 클래스는 API 요청 중 발생할 수 있는 에러를 나타냅니다.
 * 이 클래스는 상태 코드, 에러 코드, 메시지 및 필드 오류를 포함합니다.
 * 이 에러는 API 요청이 실패했을 때 발생하며, 클라이언트에서 적절한 에러 처리를 할 수 있도록 도와줍니다.
 * @remarks
 * 이 클래스는 Error 클래스를 상속받아 구현되며, API 요청의 상태 코드와 에러 코드를 포함합니다.
 * 또한, 필드 오류를 배열로 받아서, 요청에 포함된 필드에 대한 구체적인 오류 정보를 제공합니다.
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ExceptionCode,
    public message: string,
    public fieldErrors: FieldError[] = []
  ) {
    super(message);
  }
}

/**
 * API 요청을 수행하는 함수. fetch를 Wrapper하여 사용합니다.
 * 이 함수는 URL과 옵션을 받아 API 요청을 수행하고, 응답을 JSON으로 변환하여 반환합니다.
 * 만약 응답이 성공적이지 않다면 ApiError를 발생시킵니다.
 *
 * @param url 요청할 API의 URL
 * @param options 요청에 사용할 옵션. FetchApiOptions 타입을 사용합니다.
 * @returns 요청에 대한 응답을 JSON으로 변환한 결과. OUTPUT 타입으로 반환됩니다.
 * @throws ApiError 요청이 실패한 경우 발생합니다. 이 에러는 상태 코드, 에러 코드, 메시지 및 필드 오류를 포함합니다.
 */
export const fetcher = async <INPUT = any, OUTPUT = any>(
  url: string,
  options?: FetchApiOptions<INPUT>
) => {
  const resolvedOption = resolveFetchOption(options);
  const response = await fetch(url, resolvedOption);

  if (response.ok) {
    return (await responseToJson(response)) as OUTPUT;
  }

  const apiError: ApiError = await toApiError(response);

  /**
   * 액세스 토큰 만료상황인 경우 토큰 리프래시하고 재요청.
   */
  if (apiError.code === 'AccessTokenExpired') {
    const { accessToken } = await refreshToken(options?.refreshToken);

    if (resolvedOption.headers) {
      Reflect.set(resolvedOption.headers, 'Authorization', `bearer ${accessToken}`);
    }

    const refetchResponse = await fetch(url, resolvedOption);

    if (!refetchResponse.ok) {
      throw await toApiError(refetchResponse);
    }

    return responseToJson(refetchResponse) as OUTPUT;
  }

  throw apiError;
};
