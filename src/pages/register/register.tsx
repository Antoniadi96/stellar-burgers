import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { registerUser } from '@/services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserError } from '@/services/selectors/user';
import { TAuthResponse } from '@/utils/burger-api';
import { setCookie } from '@/utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        return;
      }

      const payload = res.payload as TAuthResponse | undefined;
      if (payload) {
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      }
      navigate('/login');
    });
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
