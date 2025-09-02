import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients';
import feedReducer from './slices/feedSlice';
import constructorSlice from './slices/constructorSlice';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burgerConstructor: constructorSlice,
  user: userSlice
});

export type RootState = ReturnType<typeof rootReducer>;
