import { FC, memo, useMemo } from 'react';
import { useAppSelector } from '../../services/store';
import { FeedInfoUI } from '@ui';
import type { RootState } from '../../services/root-reducer';
import type { TOrder } from '@utils-types';

export const FeedInfo: FC = memo(() => {
  const { orders, total, totalToday } = useAppSelector(
    (s: RootState) => s.feed
  );

  const readyOrders = useMemo(
    () =>
      orders
        .filter((o: TOrder) => o.status === 'done')
        .map((o: TOrder) => o.number)
        .slice(0, 10),
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((o: TOrder) => o.status !== 'done')
        .map((o: TOrder) => o.number)
        .slice(0, 10),
    [orders]
  );

  return (
    <FeedInfoUI
      feed={{ total, totalToday }}
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
    />
  );
});
