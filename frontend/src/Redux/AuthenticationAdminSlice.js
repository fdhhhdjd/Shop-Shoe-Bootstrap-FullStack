import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const LoginAdminInitial = createAsyncThunk(
  "admin/LoginAdmin",
  async ({ email, password }) => {
    const response = await axios.post("/api/auth/loginAdmin", {
      email,
      password,
    });
    return response.data;
  }
);
export const RefreshTokenAdminInitial = createAsyncThunk(
  "admin/RefreshTokenAdmin",
  async ({ token }) => {
    const response = await axios.get("/api/auth/refreshTokenAdmin", {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
export const ProfileAdminInitiate = createAsyncThunk(
  "admin/ProfileAdmin",
  async ({ refreshTokensAdmin }) => {
    const response = await axios.get("/api/auth/profile", {
      headers: { Authorization: refreshTokensAdmin },
    });
    return response.data;
  }
);
const initialState = {
  loading: false,
  admin: [],
  refreshTokenAdmin: [],
  profileAdmin: [],
};
const AuthenticationAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: {
    //? Login Admin
    [LoginAdminInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginAdminInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
    },
    [LoginAdminInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? RefreshToken Admin
    [RefreshTokenAdminInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [RefreshTokenAdminInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.refreshTokenAdmin = action.payload;
    },
    [RefreshTokenAdminInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Profile Admin
    [ProfileAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ProfileAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileAdmin = action.payload;
    },
    [ProfileAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationAdmin = AuthenticationAdminSlice.reducer;
export const { reset } = AuthenticationAdminSlice.actions;
export default AuthenticationAdmin;
