import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSlice from './reducers/ingredients-slice';
import constructorSlice from './reducers/constructor-slice';
import feedsSlice from './reducers/feeds-slice';
import authSlice from './reducers/auth-slice';
import ordersUserSlice from './reducers/order-slice';
import orderNumberSlice from './reducers/order-number-slice';

export const rootReducer = combineReducers({
  ingredientsSlice,
  constructorSlice,
  feedsSlice,
  authSlice,
  ordersUserSlice,
  orderNumberSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = () => dispatchHook();

export default store;
