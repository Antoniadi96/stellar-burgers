import { TConstructorIngredient, TIngredient, TOrder } from '@/utils/types';
import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@/utils/burger-api';

interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  isLoading: boolean;
  error: string | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
}
const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null,
  orderModalData: null,
  orderRequest: false
};

export const createOrder = createAsyncThunk(
  'constructorSlice/order',
  orderBurgerApi
);

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
          return;
        }

        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    clearOrder: (state) => {
      state.orderModalData = null;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const idx = state.constructorItems.ingredients.findIndex(
        (el) => el.id === action.payload
      );
      if (idx > 0) {
        state.constructorItems.ingredients.splice(
          idx,
          0,
          state.constructorItems.ingredients.splice(idx - 1, 1)[0]
        );
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const idx = state.constructorItems.ingredients.findIndex(
        (el) => el.id === action.payload
      );
      if (idx < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients.splice(
          idx,
          0,
          state.constructorItems.ingredients.splice(idx + 1, 1)[0]
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.error = null;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        action.error.message && (state.error = action.error.message);
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearOrder
} = constructorSlice.actions;
export default constructorSlice.reducer;
