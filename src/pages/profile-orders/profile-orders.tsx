import { selectUsersOrders } from '@/services/selectors/user';
import { getUsersOrders } from '@/services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector(selectUsersOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
