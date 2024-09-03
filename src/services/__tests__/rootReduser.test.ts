import { rootReducer } from '../store';
import store from '../store';

test('проверка правильной настройки и работы rootReducer', () => {
  const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  expect(newState).toEqual(store.getState());
});
