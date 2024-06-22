import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { User } from "types";
import { LoginRes, RegisterRes } from "features/user/types";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "features/user/store/user.thunk";

export interface UserState {
  token?: string;
  user?: Partial<User>;
  isConnected: boolean;
  isLoading: boolean;
  isError: boolean;
  redirectToLogin: boolean;
  redirectToRegister: boolean;
  redirectToProfile: boolean;
}

const initialState: UserState = {
  isConnected: false,
  isLoading: false,
  isError: false,
  redirectToLogin: false,
  redirectToRegister: false,
  redirectToProfile: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoading = false;
      state.token = undefined;
      state.user = undefined;
      state.isConnected = false;
      localStorage.removeItem("authToken");
      state.redirectToRegister = true;
     
    },
    clearRedirection: (state) => {
      state.redirectToLogin = false;
      state.redirectToRegister = false;
      state.redirectToProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<LoginRes>) => {
          state.isLoading = false;
          state.token = payload;
          state.isConnected = true;
          state.redirectToProfile = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isConnected = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload: user }: PayloadAction<RegisterRes>) => {
          state.isLoading = false;
          state.isError = false;
          state.user = user;
          state.redirectToLogin = true;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, { payload: user }: PayloadAction<User>) => {
          state.isLoading = false;
          state.isError = false;
          state.user = user;
        }
      )
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const userActions = {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser: userSlice.actions.logoutUser,
  clearRedirection: userSlice.actions.clearRedirection,
};

export const UserActions = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
