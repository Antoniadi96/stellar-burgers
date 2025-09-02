import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error, total, totalToday } = useAppSelector(
    (state) => state.feed
  );

  useEffect(() => {
    console.log('Dispatching getFeeds...');
    dispatch(getFeeds());
  }, [dispatch]);

  useEffect(() => {
    console.log('Current state:', {
      orders,
      loading,
      error,
      total,
      totalToday
    });
  }, [orders, loading, error, total, totalToday]);

  if (loading) {
    console.log('Showing preloader...');
    return <Preloader />;
  }

  if (error) {
    console.log('Showing error:', error);
    return <div>Ошибка: {error}</div>;
  }

  console.log('Rendering FeedUI with orders:', orders);

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
