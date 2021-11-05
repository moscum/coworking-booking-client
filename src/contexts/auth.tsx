import React, { createContext, useState, useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import api from '@src/api';
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
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    if (!isAuthenticated) {
      await api.post(
        '/security/login',
        JSON.stringify({
          login: email,
          password,
        })
      );
      await api.get<UserModel>('/user').then((res) => setUser(res.data));
      await router.push('/');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    if (isAuthenticated) {
      await api.post('/security/logout');
      setUser(null);
      await router.push('/');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const token = parseCookies().SID;
    if (!token) {
      setUser(null);
      setIsLoading(false);
    } else {
      api
        .get<UserModel>('/user')
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
