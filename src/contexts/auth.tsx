import React, { createContext, useState, useContext, useEffect } from 'react';

import Cookies from 'js-cookie';

import api from '@src/api';
import { UserModel } from '@src/models';

interface AuthModel {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserModel | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthModel>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  const login = async () => {
    setIsLoading(true);
    const body = {
      login: 'test@example.com',
      password: 'test',
    };
    try {
      await api.post('/security/login', JSON.stringify(body));
      await api.get<UserModel>('/user').then((res) => setUser(res.data));
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    if (isAuthenticated) {
      await api.post('/security/logout').catch((error) => {
        console.log(error);
      });
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get('SID');
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
