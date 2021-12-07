export interface User {
  id: number;
  role: 'User' | 'Admin';
  firstName: string;
  lastName: string;
  email: string;
}
