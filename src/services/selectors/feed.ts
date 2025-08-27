import { RootState } from '../store';

export const selectOrderById = (s: RootState) => s.feed.orderById;
