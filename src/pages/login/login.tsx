import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { loginUser } from '@/services/slices/userSlice';
import { selectUserError } from '@/services/selectors/user';
import { setCookie } from '@/utils/cookie';
import { TAuthResponse } from '@/utils/burger-api';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        return;
      }

      const payload = res.payload as TAuthResponse | undefined;
      if (payload) {
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      }
    });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
