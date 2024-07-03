import { configureStore } from '@reduxjs/toolkit';
import { getFeeds } from '../actions';
import feedsSlice from '../reducers/feeds-slice';

describe('проверка feeds', () => {
  const mockOrders = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  test('проверка pending', () => {
    const store = configureStore({
      reducer: { feedsSlice }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.isLoading).toBe(true);
    expect(states.orders).toBeNull();
    expect(states.error).toBeUndefined();
  });

  test('проверка fulfilled', async () => {
    const store = configureStore({
      reducer: { feedsSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: mockOrders
          })
      })
    ) as jest.Mock;

    await store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.orders?.orders).toEqual(mockOrders);
    expect(states.isLoading).toBe(false);
    expect(states.error).toBeUndefined;
  });

  test('проверка reject', async () => {
    const store = configureStore({
      reducer: { feedsSlice }
    });

    const errorMessage = 'Ошибка';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.orders).toBeNull;
    expect(states.isLoading).toBe(false);
    expect(states.error).toEqual(errorMessage);
  });
});
