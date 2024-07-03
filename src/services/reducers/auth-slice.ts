import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, register, logout, updateUser } from '../actions';

interface UserState {
  error: string | null;
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  userRequest: boolean;
}

const initialState: UserState = {
  error: '',
  user: null,
  isAuth: false,
  isAuthChecked: false,
  userRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(login.pending, (state) => {
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.userRequest = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userRequest = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
        state.userRequest = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
export const { setUser, setIsAuthChecked } = authSlice.actions;
