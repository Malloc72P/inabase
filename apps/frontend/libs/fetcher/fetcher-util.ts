import { FetchApiOptions } from './fetcher-interface';

export function resolveFetchOption(options: FetchApiOptions | undefined): RequestInit {
  const { body, headers, method, accessToken, refreshToken, ...rest } = options || {};

  const isFormData = body instanceof FormData;
  const processedHeaders = { ...headers };
  const processedBody =
    body && typeof body === 'object' && !isFormData ? JSON.stringify(body) : body;

  if (!isFormData) {
    Reflect.set(processedHeaders, 'Content-Type', 'application/json; charset=utf-8');
  }

  if (accessToken) {
    Reflect.set(processedHeaders, 'Authorization', `bearer ${accessToken}`);
  }

  if (refreshToken) {
    Reflect.set(processedHeaders, 'RefreshToken', `${refreshToken}`);
  }

  return {
    ...rest,
    method: method ? method : 'GET',
    headers: processedHeaders,
    body: processedBody,
    credentials: 'include',
  };
}
