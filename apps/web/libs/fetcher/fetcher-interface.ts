export type FetchApiOptions<INPUT = any> = Omit<RequestInit, 'body' | 'method'> & {
  body?: INPUT | BodyInit;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
} & FetcherAdditionalOption;

export type FetcherAdditionalOption = {
  toastDisabled?: boolean;
};
