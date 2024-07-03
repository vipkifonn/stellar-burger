import { configureStore } from '@reduxjs/toolkit';
import { register, login, updateUser } from '../actions';
import authSlice from '../reducers/auth-slice';

describe('проверка register', () => {
  const mockRegisterUser = {
    email: 'test@test.ru',
    password: 'test',
    name: 'test'
  };

  test('проверка pending', () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(register(mockRegisterUser));
    const states = store.getState().authSlice;
    expect(states.error).toEqual('');
  });

  test('проверка fulfilled', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: mockRegisterUser
          })
      })
    ) as jest.Mock;

    await store.dispatch(register(mockRegisterUser));
    const states = store.getState().authSlice;
    expect(states.user).toEqual(mockRegisterUser);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).toBeUndefined;
  });

  test('проверка reject', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    const errorMessage = 'Ошибка';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(register(mockRegisterUser));
    const states = store.getState().authSlice;
    expect(states.user).toEqual(null);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).toEqual(errorMessage);
  });
});

describe('проверка login', () => {
  const mockLoginUser = {
    email: 'vipkifonn@yandex.ru',
    password: 'rbaf111'
  };

  test('проверка pending', () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(login(mockLoginUser));
    const states = store.getState().authSlice;
    expect(states.error).toEqual('');
  });

  test('проверка fulfilled', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: mockLoginUser
          })
      })
    ) as jest.Mock;

    await store.dispatch(login(mockLoginUser));
    const states = store.getState().authSlice;
    expect(states.user).toEqual(mockLoginUser);
    expect(states.isAuthChecked).toBe(true);
    expect(states.isAuth).toBe(true);
    expect(states.error).toBeNull;
  });

  test('проверка reject', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    const errorMessage = 'Ошибка';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(login(mockLoginUser));
    const states = store.getState().authSlice;
    expect(states.user).toBeNull;
    expect(states.isAuthChecked).toBe(true);
    expect(states.isAuth).toBe(false);
    expect(states.error).toEqual(errorMessage);
  });
});

describe('проверка updateUser', () => {
  const mockUser = { email: 'vipkifonn@yandex.ru', password: 'rbaf111' };

  test('проверка pending', () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(updateUser(mockUser));
    const states = store.getState().authSlice;
    expect(states.error).toEqual('');
    expect(states.userRequest).toBe(true);
  });

  test('проверка fulfilled', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: mockUser
          })
      })
    ) as jest.Mock;

    await store.dispatch(login(mockUser));
    const states = store.getState().authSlice;
    expect(states.user).toEqual(mockUser);
    expect(states.userRequest).toBe(false);
  });

  test('проверка reject', async () => {
    const store = configureStore({
      reducer: { authSlice }
    });

    const errorMessage = 'Ошибка';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(login(mockUser));
    const states = store.getState().authSlice;
    expect(states.userRequest).toBe(false);
    expect(states.error).toEqual(errorMessage);
  });
});
