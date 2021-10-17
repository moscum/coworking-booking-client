import { useRequest } from '@src/hooks/useRequest';
import { TableModel } from '@src/models';

export function useTables() {
  const { data, error, isValidating, mutate } = useRequest<TableModel[]>({
    url: 'table/getTables',
  });

  return { tables: data, error, isValidating, mutate };
}
