export interface UserModel {
  id: number;
  role: 'User' | 'Admin';
  firstName: string;
  lastName: string;
  email: string;
}
