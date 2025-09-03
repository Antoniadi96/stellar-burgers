import ingredientReducer, {
  fetchIngredients,
  IngredientsState,
  initialState
} from '../ingredients';

describe('ingredientsSlice', () => {
  const errorText = 'some error';

  describe('тестирование fetchIngredients', () => {
    it('тестирование fetchIngredients.pending', () => {
      const updatedState = ingredientReducer(initialState, {
        type: fetchIngredients.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('тестирование fetchIngredients.rejected', () => {
      const startState: IngredientsState = {
        ...initialState,
        isLoading: true
      };

      const updatedState = ingredientReducer(startState, {
        type: fetchIngredients.rejected.type,
        payload: errorText
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование fetchIngredients.fullfilled', () => {
      const startState: IngredientsState = {
        ...initialState,
        isLoading: true,
        error: errorText
      };

      const payload = ['mock1', 'mock2'];
      const updatedState = ingredientReducer(startState, {
        type: fetchIngredients.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        items: payload,
        isLoading: false
      });
    });
  });
});
