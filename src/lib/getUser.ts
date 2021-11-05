import api from '@src/api';
import { UserModel } from '@src/models';

export async function getUser() {
  return api.get<UserModel>('/user').then((res) => res.data);
}
