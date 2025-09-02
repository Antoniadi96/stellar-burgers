import ingredientReducer, {
  fetchIngredients,
  IngredientsState
} from '../ingredients';

describe('ingredientsSlice', () => {
  const errorText = 'some error';

  describe('тестирование fetchIngredients', () => {
    it('тестирование fetchIngredients.pending', () => {
      const initialState: IngredientsState = {
        items: [],
        isLoading: false,
        error: null
      };
      const updatedState = ingredientReducer(initialState, {
        type: fetchIngredients.pending.type
      });
      expect(updatedState).toEqual({ items: [], isLoading: true, error: null });
    });

    it('тестирование fetchIngredients.rejected', () => {
      const initialState: IngredientsState = {
        items: [],
        isLoading: true,
        error: null
      };

      const updatedState = ingredientReducer(initialState, {
        type: fetchIngredients.rejected.type,
        payload: errorText
      });
      expect(updatedState).toEqual({
        items: [],
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование fetchIngredients.fullfilled', () => {
      const initialState: IngredientsState = {
        items: [],
        isLoading: true,
        error: errorText
      };

      const payload = ['mock1', 'mock2'];
      const updatedState = ingredientReducer(initialState, {
        type: fetchIngredients.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        items: payload,
        isLoading: false,
        error: null
      });
    });
  });
});
