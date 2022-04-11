import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const LoginInitial = createAsyncThunk(
  "auth/Login",
  async ({ email, password, toast, rememberer }) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    if (rememberer === true) {
      localStorage.setItem(
        "remember",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    }
    if (response.data.status === 200) {
      toast.success("Login User Successfully 🥰");
    }
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
export const LogoutInitiate = createAsyncThunk(
  "/api/auth/Logout",
  async ({ navigate, toast }) => {
    const response = await axios.get("/api/auth/logout");
    if (response.data.status === 200) {
      localStorage.removeItem("firstLogin");
      toast.success("Logout Success Thank You!");
      window.location.href = "/login";
    }
    return response.data;
  }
);
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
export const ForgetInitiate = createAsyncThunk(
  "auth/Forget",
  async ({ email }) => {
    const response = await axios.post("/api/auth/forget", {
      email,
    });
    return response.data;
  }
);
export const ResetInitiate = createAsyncThunk(
  "auth/Reset",
  async ({ token, password, confirmPassword }) => {
    const response = await axios.put(`/api/auth/password/reset/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  }
);
export const ProfileInitiate = createAsyncThunk(
  "auth/Profile",
  async ({ token }) => {
    const response = await axios.get("/api/auth/profile", {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
export const ChangePasswordInitiate = createAsyncThunk(
  "auth/ChangePassword",
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
export const LoginGoogleInitiate = createAsyncThunk(
  "auth/LoginGoogle",
  async (response) => {
    const res = await axios
      .post("/api/auth/loginGoogle", { tokenId: response.tokenId })
      .then((user) => user.data)
      .catch((error) => {
        console.log(error.data);
      });
    return res;
  }
);
export const LoginFacebookInitiate = createAsyncThunk(
  "auth/LoginFacebook",
  async (response) => {
    const res = await axios
      .post("/api/auth/loginFacebook", {
        accessToken: response.accessToken,
        userID: response.userID,
      })
      .then((user) => user.data)
      .catch((error) => {
        console.log(error.data);
      });
    return res;
  }
);
export const CheckPasswordInitiate = createAsyncThunk(
  "auth/CheckPassword",
  async ({ token, checkPass }) => {
    console.log(checkPass);
    const { data } = await axios.post(
      `/api/payment/checkPass`,
      { checkPassword: checkPass },
      {
        headers: { Authorization: token },
      }
    );
    return data;
  }
);
const initialState = {
  loading: false,
  error: null,
  refreshToken: [],
  auth: [],
  logout: false,
  authRegister: [],
  forget: [],
  resetForget: [],
  profile: [],
  changePass: [],
  checkPass: [],
};
const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.auth = [];
      state.authRegister = [];
      state.forget = [];
      state.resetForget = [];
      state.changePass = [];
      state.changePass = [];
    },
  },
  extraReducers: {
    //? Login
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
    //? Refresh_token
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
    //? Logout
    [LogoutInitiate.pending]: (state, action) => {
      state.logout = false;
    },
    [LogoutInitiate.fulfilled]: (state, action) => {
      state.logout = true;
    },
    [LogoutInitiate.rejected]: (state, action) => {
      state.logout = false;
    },
    //? Register
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
    //? Forget
    [ForgetInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ForgetInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.forget = action.payload;
    },
    [ForgetInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Reset
    [ResetInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ResetInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetForget = action.payload;
    },
    [ResetInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Profile
    [ProfileInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ProfileInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    [ProfileInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Change Password
    [ChangePasswordInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ChangePasswordInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.changePass = action.payload;
    },
    [ChangePasswordInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Login Google
    [LoginGoogleInitiate.pending]: (state, action) => {
      state.loading = false;
    },
    [LoginGoogleInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [LoginGoogleInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Login Facebook
    [LoginFacebookInitiate.pending]: (state, action) => {
      state.loading = false;
    },
    [LoginFacebookInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [LoginFacebookInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //?Check Password
    [CheckPasswordInitiate.pending]: (state, action) => {
      state.loading = false;
    },
    [CheckPasswordInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.checkPass = action.payload;
    },
    [CheckPasswordInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Authentication = AuthenticationSlice.reducer;
export const { reset } = AuthenticationSlice.actions;
export default Authentication;
