import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const LoginInitial = createAsyncThunk(
  "auth/Login",
  async ({ email, password }) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);
export const RefreshTokenInitiate = createAsyncThunk(
  "auth/refresh_token",
  async ({ token }) => {
    const response = await axios.get("/api/auth/refresh_token", {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
export const LogoutInitiate = createAsyncThunk("/api/auth/Logout", async () => {
  const response = await axios.get("/api/auth/logout");
  localStorage.removeItem("firstLogin");
  window.location.href = "/login";
  return response.data;
});
export const RegisterInitiate = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }) => {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  }
);
const initialState = {
  loading: false,
  error: null,
  refreshToken: [],
  auth: [],
  logout: false,
  authRegister: [],
};
const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.authRegister = [];
    },
  },
  //! Get all Cocktail
  extraReducers: {
    //Login
    [LoginInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [LoginInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Refresh_token
    [RefreshTokenInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [RefreshTokenInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.refreshToken = action.payload;
    },
    [RefreshTokenInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Logout
    [LogoutInitiate.pending]: (state, action) => {
      state.logout = false;
    },
    [LogoutInitiate.fulfilled]: (state, action) => {
      state.logout = true;
    },
    [LogoutInitiate.rejected]: (state, action) => {
      state.logout = false;
    },
    //Register
    [RegisterInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [RegisterInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.authRegister = action.payload;
    },
    [RegisterInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Authentication = AuthenticationSlice.reducer;
export const { reset } = AuthenticationSlice.actions;
export default Authentication;
