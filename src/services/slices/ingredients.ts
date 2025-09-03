import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import type { TIngredient } from '@utils-types';
import type { RootState } from '../root-reducer';

export type IngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
export const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { state: RootState; rejectValue: string }
>(
  'ingredients/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Не удалось загрузить ингредиенты');
    }
  },
  {
    condition: (_, { getState }) => {
      const { items, isLoading } = getState().ingredients;
      if (isLoading || items.length > 0) return false;
      return true;
    }
  }
);

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchIngredients.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    });
    b.addCase(
      fetchIngredients.fulfilled,
      (s, a: PayloadAction<TIngredient[]>) => {
        s.items = a.payload;
        s.isLoading = false;
        s.error = null;
      }
    );
    b.addCase(fetchIngredients.rejected, (s, a) => {
      s.isLoading = false;
      s.error = a.payload ?? 'Ошибка';
    });
  }
});

export default slice.reducer;
