import { AxiosResponse } from 'axios';

import { provider } from '@src/api/provider';
import { TableModel } from '@src/models';

export const table = {
  getTables: (): Promise<AxiosResponse<TableModel>> => provider.get('/tables'),
};
