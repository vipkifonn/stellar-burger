import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerReducer from '../slises/burger/slice';
import ingredientsReducer from '../slises/ingridient/slice';
import orderReducer from '../slises/price/slice';
import userReducer from '../slises/client/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
