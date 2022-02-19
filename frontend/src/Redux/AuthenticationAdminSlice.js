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
export const RegisterAdminInitial = createAsyncThunk(
  "admin/Register",
  async ({ name, email, password }) => {
    const response = await axios.post("/api/auth/RegisterAdmin", {
      name,
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
export const LogoutAdminInitiate = createAsyncThunk(
  "/admin/logoutAdmin",
  async () => {
    const response = await axios.get("/api/auth/logoutAdmin");
    localStorage.removeItem("firstLoginAdmin");
    window.location.href = "/loginAdmin";
    return response.data;
  }
);
export const ForgetAdminInitiate = createAsyncThunk(
  "auth/ForgetAdmin",
  async ({ email }) => {
    const response = await axios.post("/api/auth/forgetAdmin", {
      email,
    });
    return response.data;
  }
);
export const LoginGooglAdminInitiate = createAsyncThunk(
  "admin/LoginGoogleAdmin",
  async (response) => {
    const res = await axios
      .post("/api/auth/loginGoogleAdmin", { tokenId: response.tokenId })
      .then((user) => user.data)
      .catch((error) => {
        console.log(error.data);
      });
    console.log(res);
    return res;
  }
);
export const ResetAdminInitiate = createAsyncThunk(
  "admin/ResetAdmin",
  async ({ token, password, confirmPassword }) => {
    const response = await axios.put(`/api/auth/password/reset/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  }
);
export const ChangePasswordAdminInitiate = createAsyncThunk(
  "admin/ChangePassword",
  async ({ token, ...state }) => {
    const { data } = await axios.patch(
      `/api/auth/changePassword`,
      { ...state },
      {
        headers: { Authorization: token },
      }
    );
    return data;
  }
);
const initialState = {
  loading: false,
  admin: [],
  registerAdmin: [],
  refreshTokenAdmin: [],
  changePasswordAdmin: [],
  profileAdmin: [],
  resetAdmin: [],
  forgetAdmin: [],
  logoutAdmin: false,
};
const AuthenticationAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.registerAdmin = [];
      state.admin = [];
      state.resetAdmin = [];
      state.changePasswordAdmin = [];
    },
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
    //?LoginGoogle Admin
    [LoginGooglAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginGooglAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
    },
    [LoginGooglAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //? Register Admin
    [RegisterAdminInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [RegisterAdminInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.registerAdmin = action.payload;
    },
    [RegisterAdminInitial.rejected]: (state, action) => {
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
    //? Logout Admin
    [LogoutAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [LogoutAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.logoutAdmin = true;
    },
    [LogoutAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Forget Admin
    [ForgetAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ForgetAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.forgetAdmin = action.payload;
    },
    [ForgetAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Reset Admin
    [ResetAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ResetAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetAdmin = action.payload;
    },
    [ResetAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Reset Admin
    [ChangePasswordAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ChangePasswordAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.changePasswordAdmin = action.payload;
    },
    [ChangePasswordAdminInitiate.refective]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationAdmin = AuthenticationAdminSlice.reducer;
export const { reset } = AuthenticationAdminSlice.actions;
export default AuthenticationAdmin;
