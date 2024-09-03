import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { getFeeds, orderByNumber } from '../actions';

interface feedsState {
  orders: TOrdersData | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: feedsState = {
  orders: null,
  isLoading: false,
  error: undefined
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      );
  }
});

export default feedsSlice.reducer;
