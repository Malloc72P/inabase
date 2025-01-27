import { FetchApiOptions } from './fetcher-interface';
import { resolveFetchOption } from './fetcher-util';

export const fetcher = async <INPUT = any, OUTPUT = any>(
  url: string,
  options?: FetchApiOptions<INPUT>
) => {
  const resolvedOption = resolveFetchOption(options);

  const response = await fetch(url, resolvedOption);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }

  return response.json() as OUTPUT;
};
