import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const LoginInitial = createAsyncThunk(
  "auth/Login",
  async ({ email, password, toast, rememberer, token }) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
      token,
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
  async ({ toast }) => {
    const response = await axios.get("/api/auth/logout");
    if (response.data.status === 200) {
      toast.success("Logout Success Thank You!");
      window.location.href = "/login";
    }
    return response.data;
  }
);
export const RegisterInitiate = createAsyncThunk(
  "auth/register",
  async ({
    name,
    phone_number,
    date_of_birth,
    email,
    password,
    confirmPassword,
    token,
  }) => {
    const response = await axios.post("/api/auth/register", {
      name,
      phone_number,
      date_of_birth,
      email,
      password,
      confirmPassword,
      token,
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
    // return response.data;
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
export const ChangePasswordLoginGgFbInitiate = createAsyncThunk(
  "auth/ChangePasswordLoginGgFb",
  async ({ tokens, ...state }) => {
    const { data } = await axios.patch(
      `/api/auth/changePasswordGgFb`,
      {
        ...state,
      },
      {
        headers: { Authorization: tokens },
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
export const UploadProfileInitiate = createAsyncThunk(
  "auth/uploadProfile",
  async ({ tokens, result }) => {
    console.log(result);
    const { data } = await axios.patch(
      `/api/auth/profile/update`,
      { phone_number: result.value.phone, date_of_birth: result.value.date },
      {
        headers: { Authorization: tokens },
      }
    );
    return data;
  }
);
export const LoginPhoneInitial = createAsyncThunk(
  "auth/Login",
  async ({ number, toast }) => {
    number = "0" + number.slice(3);
    const response = await axios.post("/api/auth/loginPhone", {
      phone_number: number,
    });
    if (response.data.status === 200) {
      toast.success("Login User Successfully 🥰");
    }
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
  forget: [],
  resetForget: [],
  profile: [],
  changePass: [],
  checkPass: [],
  CheckCreate: [],
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
      state.CheckCreate = [];
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
    //? Login Phone
    [LoginPhoneInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginPhoneInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [LoginPhoneInitial.rejected]: (state, action) => {
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
    //? Change Password Google Facebook
    [ChangePasswordLoginGgFbInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [ChangePasswordLoginGgFbInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.CheckCreate = action.payload;
    },
    [ChangePasswordLoginGgFbInitiate.rejected]: (state, action) => {
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
    // https://

    [UploadProfileInitiate.pending]: (state, action) => {
      state.loading = false;
    },
    [UploadProfileInitiate.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UploadProfileInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Authentication = AuthenticationSlice.reducer;
export const { reset } = AuthenticationSlice.actions;
export default Authentication;
