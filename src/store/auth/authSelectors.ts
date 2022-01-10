import { RootState } from '@store/store';

export const selectUserState = ({ auth }: RootState) => auth;
