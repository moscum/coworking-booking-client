import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

import { provider } from '@src/api/provider';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
}

export function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  config: SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),
    () => provider.request<Data>(request!),
    {
      ...config,
    }
  );

  return {
    data: response && response.data,
    error,
    isValidating,
    mutate,
  };
}
