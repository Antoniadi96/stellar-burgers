import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '@/utils/burger-api';
import { TOrder, TUser } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: TUser | null;
  usersOrders: TOrder[];
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  usersOrders: [],
  isAuth: false,
  isLoading: false,
  error: null
};

export const refreshUser = createAsyncThunk('user/refresh', getUserApi);

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const editUser = createAsyncThunk('user/edit', updateUserApi);

export const getUsersOrders = createAsyncThunk('user/orders', getOrdersApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      action.error.message && (state.error = action.error.message);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      action.error.message && (state.error = action.error.message);
    });

    builder.addCase(refreshUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.error = null;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.isLoading = false;
      action.error.message && (state.error = action.error.message);
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      action.error.message && (state.error = action.error.message);
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuth = false;
      state.error = null;
    });

    builder.addCase(editUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      action.error.message && (state.error = action.error.message);
    });

    builder.addCase(getUsersOrders.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getUsersOrders.fulfilled, (state, action) => {
      state.usersOrders = action.payload;
      state.error = null;
    });
    builder.addCase(getUsersOrders.rejected, (state, action) => {
      action.error.message && (state.error = action.error.message);
    });
  }
});

export default userSlice.reducer;
