import React, { createContext, useState, useContext, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { user } from '@src/api';
import { UserModel } from '@src/models';

interface AuthModel {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserModel | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthModel>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!currentUser;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    if (!isAuthenticated) {
      await user.login(email, password);
      const { data } = await user.getUser();
      setCurrentUser(data);
      await router.push('/');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    if (isAuthenticated) {
      await user.logout();
      setCurrentUser(null);
      await router.push('/');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const token = parseCookies().SID;
    if (!token) {
      setCurrentUser(null);
      setIsLoading(false);
    } else {
      user
        .getUser()
        .then((res: AxiosResponse<UserModel>) => {
          setCurrentUser(res.data);
        })
        .catch(() => setCurrentUser(null))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user: currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
