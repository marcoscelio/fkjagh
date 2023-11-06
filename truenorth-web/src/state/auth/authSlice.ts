import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
const authInitialState: AuthState = {};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: authInitialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = {
        ...state.authData,
        ...action.payload,
      };
    },
    logout: () => {
      // Clearing the storage is handled in the rootReducer
      // See: https://bionicjulia.com/blog/clear-redux-toolkit-state-with-redux-persist-and-typescript
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
