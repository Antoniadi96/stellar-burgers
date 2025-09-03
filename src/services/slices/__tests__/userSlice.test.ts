import userReducer, {
  editUser,
  getUsersOrders,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  UserState,
  initialState
} from '../userSlice';

describe('userSlice', () => {
  const errorText = 'some error';

  // Константы
  const testUser = {
    email: 'test@test.com',
    name: 'test'
  };

  const testUserOrders = ['order1', 'order2'];

  const authState: Partial<UserState> = {
    isAuth: true,
    error: 'test'
  };

  const loadingState: Partial<UserState> = {
    isLoading: true
  };

  // Тесты
  describe('тестирование editUser', () => {
    it('тестирование editUser.pending', () => {
      const updatedState = userReducer(initialState, {
        type: editUser.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('тестирование editUser.rejected', () => {
      const startState: UserState = {
        ...initialState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: editUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование editUser.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState,
        ...loadingState
      };

      const payload = { user: testUser };
      const updatedState = userReducer(startState, {
        type: editUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        user: testUser,
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование getUsersOrders', () => {
    it('тестирование getUsersOrders.pending', () => {
      const startState: UserState = {
        ...initialState,
        error: errorText
      };

      const updatedState = userReducer(startState, {
        type: getUsersOrders.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        error: null
      });
    });

    it('тестирование getUsersOrders.rejected', () => {
      const updatedState = userReducer(initialState, {
        type: getUsersOrders.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        error: errorText
      });
    });

    it('тестирование getUsersOrders.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState
      };

      const updatedState = userReducer(startState, {
        type: getUsersOrders.fulfilled.type,
        payload: testUserOrders
      });

      expect(updatedState).toEqual({
        ...initialState,
        usersOrders: testUserOrders,
        isAuth: true,
        error: null
      });
    });
  });

  describe('тестирование loginUser', () => {
    it('тестирование loginUser.pending', () => {
      const updatedState = userReducer(initialState, {
        type: loginUser.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('тестирование loginUser.rejected', () => {
      const startState: UserState = {
        ...initialState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: loginUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование loginUser.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState,
        ...loadingState
      };

      const payload = { user: testUser };
      const updatedState = userReducer(startState, {
        type: loginUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        user: testUser,
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование logoutUser', () => {
    it('тестирование logoutUser.pending', () => {
      const startState: UserState = {
        ...initialState,
        user: testUser,
        isAuth: true
      };

      const updatedState = userReducer(startState, {
        type: logoutUser.pending.type
      });

      expect(updatedState).toEqual({
        ...startState,
        isLoading: true
      });
    });

    it('тестирование logoutUser.rejected', () => {
      const startState: UserState = {
        ...initialState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: logoutUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование logoutUser.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: logoutUser.fulfilled.type
      });

      expect(updatedState).toEqual(initialState);
    });
  });

  describe('тестирование refreshUser', () => {
    it('тестирование refreshUser.pending', () => {
      const updatedState = userReducer(initialState, {
        type: refreshUser.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('тестирование refreshUser.rejected', () => {
      const startState: UserState = {
        ...initialState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: refreshUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование refreshUser.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState,
        ...loadingState
      };

      const payload = { user: testUser };
      const updatedState = userReducer(startState, {
        type: refreshUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        user: testUser,
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование registerUser', () => {
    it('тестирование registerUser.pending', () => {
      const updatedState = userReducer(initialState, {
        type: registerUser.pending.type
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('тестирование registerUser.rejected', () => {
      const startState: UserState = {
        ...initialState,
        ...loadingState
      };

      const updatedState = userReducer(startState, {
        type: registerUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование registerUser.fulfilled', () => {
      const startState: UserState = {
        ...initialState,
        ...authState,
        ...loadingState
      };

      const payload = { user: testUser };
      const updatedState = userReducer(startState, {
        type: registerUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        ...initialState,
        user: testUser,
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });
});
