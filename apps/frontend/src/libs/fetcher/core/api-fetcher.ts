export interface ApiFetcherOption {
  accessToken?: string;
  refreshToken?: string;
}

export type ApiFetcher<I = any, O = any> = (input: I, option?: ApiFetcherOption) => Promise<O>;
