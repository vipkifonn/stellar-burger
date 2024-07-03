import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ordersUser } from '../actions';

interface OrdersUserState {
  orders: TOrder[];
}

const initialState: OrdersUserState = {
  orders: []
};

const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ordersUser.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export default ordersUserSlice.reducer;
