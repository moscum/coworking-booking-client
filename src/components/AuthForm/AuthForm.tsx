import React, { useState } from 'react';

import { Button, Input, useNotifications } from 'clcm';

import { useDispatch } from '@src/hooks';
import { login } from '@store/user';

import styles from './AuthForm.module.scss';

export const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotifications();

  // Todo: clcm ^2.0.10 close button bug will be fixed later
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password })).catch(() =>
      sendNotification('Неверный логин или пароль', 'danger', 2.5, {
        onClose: undefined,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col w-64'}>
      <h1 className={'text-center mb-3 text-3xl font-manrope'}>Вход</h1>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        placeholder={'Логин'}
        required
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        placeholder={'Пароль'}
        required
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};
