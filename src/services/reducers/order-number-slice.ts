import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderByNumber } from '../actions';

interface orderByNumberState {
  selectedOrders: TOrder[] | null;
}

const initialState: orderByNumberState = {
  selectedOrders: null
};

const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {
    clearSelectedOrders: (state) => {
      state.selectedOrders = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderByNumber.fulfilled, (state, action) => {
      state.selectedOrders = action.payload;
    });
  }
});

export const { clearSelectedOrders } = orderByNumberSlice.actions;
export default orderByNumberSlice.reducer;
