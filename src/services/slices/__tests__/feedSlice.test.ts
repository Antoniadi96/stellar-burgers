import feedReducer, {
  FeedState,
  getFeeds,
  getOrderById,
  initialState
} from '../feedSlice';

describe('feedSlice', () => {
  const errorText = 'some error';

  describe('тестирование getFeeds', () => {
    it('тестирование getFeeds.pending', () => {
      const updatedState = feedReducer(initialState, {
        type: getFeeds.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('тестирование getFeeds.rejected', () => {
      const startState: FeedState = {
        ...initialState,
        loading: true
      };

      const updatedState = feedReducer(startState, {
        type: getFeeds.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        loading: false,
        error: errorText
      });
    });

    it('тестирование getFeeds.fullfilled', () => {
      const startState: FeedState = {
        ...initialState,
        loading: true
      };

      const payload = {
        orders: ['mock1', 'mock2'],
        total: 1337,
        totalToday: 66
      };

      const updatedState = feedReducer(startState, {
        type: getFeeds.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        orders: ['mock1', 'mock2'],
        total: 1337,
        totalToday: 66,
        loading: false
      });
    });
  });

  describe('тестирование getOrderById', () => {
    it('тестирование getOrderById.pending', () => {
      const updatedState = feedReducer(initialState, {
        type: getOrderById.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('тестирование getOrderById.rejected', () => {
      const startState: FeedState = {
        ...initialState,
        loading: true
      };

      const updatedState = feedReducer(startState, {
        type: getOrderById.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        loading: false,
        error: errorText
      });
    });

    it('тестирование getOrderById.fullfilled', () => {
      const startState: FeedState = {
        ...initialState,
        loading: true
      };

      const payload = {
        orders: ['mock1']
      };

      const updatedState = feedReducer(startState, {
        type: getOrderById.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        orderById: 'mock1',
        loading: false
      });
    });
  });
});
