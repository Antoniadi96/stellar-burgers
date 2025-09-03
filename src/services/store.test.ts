import { rootReducer } from './root-reducer';
import { store } from './store';

test('правильная инициализация rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'UNKNOWN' });
  const actual = store.getState();
  expect(actual).toEqual(expected);
});
