//authReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Message {
  type: string;
  message: string;
}

interface authState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  token: null | string;
  user: object;
  message: Message;
}

const initialState: authState = {
  isAuthenticated: false,
  isAuthenticating: true,
  token: null,
  user: {},
  message: {
    type: "",
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
    setToken: (state, action: PayloadAction<null | string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setIsAuthenticating,
  setToken,
  setUser,
  setMessage,
} = authSlice.actions;
export default authSlice.reducer;
