import React, { createContext, useState, useContext, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import Router from 'next/router';
import { parseCookies } from 'nookies';

import { user } from '@src/api';
import { UserModel } from '@src/models';

interface AuthContextModel {
  isLoading: boolean;
  user: UserModel | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthContextModel>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = !!currentUser;

  const login = async (email: string, password: string) => {
    if (!isAuth) {
      await user
        .login(email, password)
        .then(() => setIsLoading(true))
        .catch(() => setIsLoading(false));
      const { data } = await user.getUser();
      await setCurrentUser(data);
      await Router.push('/');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    if (isAuth) {
      await user.logout();
      setCurrentUser(null);
      await Router.push('/');
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
