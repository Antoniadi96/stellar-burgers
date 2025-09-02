import userReducer, {
  editUser,
  getUsersOrders,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  UserState
} from '../userSlice';

describe('userSlice', () => {
  const errorText = 'some error';

  describe('тестирование editUser', () => {
    it('тестирование editUser.pending', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: editUser.pending.type
      });
      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      });
    });

    it('тестирование editUser.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: editUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование editUser.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: 'test'
      };

      const payload = {
        user: {
          email: 'test@test.com',
          name: 'test'
        }
      };
      const updatedState = userReducer(initialState, {
        type: editUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        user: payload.user,
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование getUsersOrders', () => {
    it('тестирование getUsersOrders.pending', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      };

      const updatedState = userReducer(initialState, {
        type: getUsersOrders.pending.type
      });
      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      });
    });

    it('тестирование getUsersOrders.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: getUsersOrders.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование getUsersOrders.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: 'test'
      };

      const payload = ['order1', 'order2'];
      const updatedState = userReducer(initialState, {
        type: getUsersOrders.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: payload,
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование loginUser', () => {
    it('тестирование loginUser.pending', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: loginUser.pending.type
      });
      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      });
    });

    it('тестирование loginUser.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование loginUser.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: 'test'
      };

      const payload = {
        user: {
          email: 'test@test.com',
          name: 'test'
        }
      };
      const updatedState = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        user: payload.user,
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование logoutUser', () => {
    it('тестирование logoutUser.pending', () => {
      const initialState: UserState = {
        user: {
          email: 'test@test.com',
          name: 'test'
        },
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: logoutUser.pending.type
      });
      expect(updatedState).toEqual({
        user: {
          email: 'test@test.com',
          name: 'test'
        },
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: null
      });
    });

    it('тестирование logoutUser.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: logoutUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование logoutUser.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: 'test'
      };

      const updatedState = userReducer(initialState, {
        type: logoutUser.fulfilled.type
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование refreshUser', () => {
    it('тестирование refreshUser.pending', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: refreshUser.pending.type
      });
      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      });
    });

    it('тестирование refreshUser.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: refreshUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование refreshUser.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: 'test'
      };

      const payload = {
        user: {
          email: 'test',
          name: 'test@test.com'
        }
      };
      const updatedState = userReducer(initialState, {
        type: refreshUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        user: payload.user,
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });

  describe('тестирование registerUser', () => {
    it('тестирование registerUser.pending', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: registerUser.pending.type
      });
      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      });
    });

    it('тестирование registerUser.rejected', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: true,
        error: null
      };

      const updatedState = userReducer(initialState, {
        type: registerUser.rejected.type,
        error: { message: errorText }
      });

      expect(updatedState).toEqual({
        user: null,
        usersOrders: [],
        isAuth: false,
        isLoading: false,
        error: errorText
      });
    });

    it('тестирование registerUser.fullfilled', () => {
      const initialState: UserState = {
        user: null,
        usersOrders: [],
        isAuth: true,
        isLoading: true,
        error: 'test'
      };

      const payload = {
        user: {
          email: 'test@test.com',
          name: 'test'
        }
      };
      const updatedState = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload
      });

      expect(updatedState).toEqual({
        user: payload.user,
        usersOrders: [],
        isAuth: true,
        isLoading: false,
        error: null
      });
    });
  });
});
