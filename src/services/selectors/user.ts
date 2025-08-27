import { RootState } from '../root-reducer';

export const selectUserError = (s: RootState) => s.user.error;

export const selectUserLoading = (s: RootState) => s.user.isLoading;

export const selectUserAuth = (s: RootState) => s.user.isAuth;

export const selectUser = (s: RootState) => s.user.user;

export const selectUsersOrders = (s: RootState) => s.user.usersOrders;
