import { useRequest } from '@src/hooks/useRequest';
import { TableModel } from '@src/models';

export function useTables() {
  const { data, error, isValidating, mutate } = useRequest<TableModel[]>({
    url: 'table/getTables',
    withCredentials: true,
  });

  return { tables: data, error, isValidating, mutate };
}
