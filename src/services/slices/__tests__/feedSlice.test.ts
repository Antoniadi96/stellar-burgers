import feedReducer, { FeedState, getFeeds, getOrderById } from '../feedSlice';

describe('feedSlice', () => {
  const errorText = 'some error';

  describe('тестирование getFeeds', () => {
    it('тестирование getFeeds.pending', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      };
      const updatedState = feedReducer(initialState, {
        type: getFeeds.pending.type
      });
      expect(updatedState).toEqual({
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      });
    });

    it('тестирование getFeeds.rejected', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      };

      const updatedState = feedReducer(initialState, {
        type: getFeeds.rejected.type,
        error: { message: errorText }
      });
      expect(updatedState).toEqual({
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: false,
        error: errorText
      });
    });

    it('тестирование getFeeds.fullfilled', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      };

      const payload = {
        orders: ['mock1', 'mock2'],
        total: 1337,
        totalToday: 66
      };

      const updatedState = feedReducer(initialState, {
        type: getFeeds.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        orders: ['mock1', 'mock2'],
        total: 1337,
        totalToday: 66,
        orderById: null,
        loading: false,
        error: null
      });
    });
  });

  describe('тестирование getOrderById', () => {
    it('тестирование getOrderById.pending', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      };
      const updatedState = feedReducer(initialState, {
        type: getOrderById.pending.type
      });
      expect(updatedState).toEqual({
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      });
    });

    it('тестирование getOrderById.rejected', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      };

      const updatedState = feedReducer(initialState, {
        type: getOrderById.rejected.type,
        error: { message: errorText }
      });
      expect(updatedState).toEqual({
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: false,
        error: errorText
      });
    });

    it('тестирование getOrderById.fullfilled', () => {
      const initialState: FeedState = {
        orders: [],
        orderById: null,
        total: 0,
        totalToday: 0,
        loading: true,
        error: null
      };

      const payload = {
        orders: ['mock1']
      };

      const updatedState = feedReducer(initialState, {
        type: getOrderById.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        orderById: 'mock1',
        loading: false,
        error: null
      });
    });
  });
});
