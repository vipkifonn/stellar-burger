import { RootState } from './store';

export const getIsAuth = (state: RootState) => state.authSlice.isAuth;
export const getConstructorBun = (state: RootState) =>
  state.constructorSlice.bun;
export const getConstructorIngredients = (state: RootState) =>
  state.constructorSlice.ingredients;
export const getOrdersUser = (state: RootState) => state.ordersUserSlice.orders;
export const getOrderData = (state: RootState) => state.constructorSlice.order;
export const getIsAuthChecked = (state: RootState) =>
  state.authSlice.isAuthChecked;
export const getSelectedOrders = (state: RootState) =>
  state.orderNumberSlice.selectedOrders;
export const getErrorMessage = (state: RootState) => state.authSlice.error;
export const getUser = (state: RootState) => state.authSlice.user;
export const getUserName = (state: RootState) => state.authSlice.user?.name;
export const getUserRequest = (state: RootState) => state.authSlice.userRequest;
export const getIngredients = (state: RootState) =>
  state.ingredientsSlice.ingredients;
export const getOrderRequest = (state: RootState) =>
  state.constructorSlice.orderRequest;
