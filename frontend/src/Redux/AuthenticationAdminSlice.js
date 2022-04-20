import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const LoginAdminInitial = createAsyncThunk(
  "admin/LoginAdmin",
  async ({ email, password, toast, remembererAdmin }) => {
    const response = await axios.post("/api/auth/loginAdmin", {
      email,
      password,
    });
    if (remembererAdmin === true) {
      localStorage.setItem(
        "rememberAdmin",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    }
    if (response.data.status === 200) {
      toast.success("Login Admin Successfully 🥰");
    }

    return response.data;
  }
);
export const RegisterAdminInitial = createAsyncThunk(
  "admin/Register",
  async ({
    name,
    phone_number,
    date_of_birth,
    email,
    password,
    confirmPassword,
  }) => {
    const response = await axios.post("/api/auth/RegisterAdmin", {
      name,
      phone_number,
      date_of_birth,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  }
);
export const VerifiedUserInitial = createAsyncThunk(
  "admin/Verified",
  async ({ id, uniqueString }) => {
    const response = await axios.post(
      `/api/auth//verify/${id}/${uniqueString}`
    );
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
  async ({ navigate, toast }) => {
    const response = await axios.get("/api/auth/logoutAdmin");
    if (response.data.status === 200) {
      localStorage.removeItem("firstLoginAdmin");
      toast.success("Logout Admin Success Thank You!");
      window.location.href = "loginAdmin";
    }

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
export const NewUserInitiate = createAsyncThunk(
  "admin/newUser",
  async ({ tokens }) => {
    const { data } = await axios.get("/api/auth/getUserDay", {
      headers: { Authorization: tokens },
    });
    return data;
  }
);
export const GetAllUserInitiate = createAsyncThunk(
  "admin/getAllUser",
  async ({ refreshTokensAdmin }) => {
    const response = await axios.get("/api/auth/getAllUser", {
      headers: { Authorization: refreshTokensAdmin },
    });
    return response.data;
  }
);
export const GetAllAdminInitiate = createAsyncThunk(
  "admin/getAllAdmin",
  async ({ refreshTokensAdmin }) => {
    const response = await axios.get("/api/auth/getAllAdmin", {
      headers: { Authorization: refreshTokensAdmin },
    });
    return response.data;
  }
);
export const GetAllUncheckInitiate = createAsyncThunk(
  "admin/getAllUncheck",
  async ({ refreshTokensAdmin }) => {
    const response = await axios.get("/api/auth/getAllUserUncheck", {
      headers: { Authorization: refreshTokensAdmin },
    });
    return response.data;
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
  newCountUser: [],
  logoutAdmin: false,
  userAll: [],
  adminAll: [],
  verify: [],
  uncheck: [],
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
      state.loading = false;
    },
    [LoginGooglAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
    },
    [LoginGooglAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //?verify
    [VerifiedUserInitial.pending]: (state, action) => {
      state.loading = false;
    },
    [VerifiedUserInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.verify = action.payload;
    },
    [VerifiedUserInitial.rejected]: (state, action) => {
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
    [ChangePasswordAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? New User 3 Day
    [NewUserInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [NewUserInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.newCountUser = action.payload;
    },
    [NewUserInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Get All User
    [GetAllUserInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllUserInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAll = action.payload;
    },
    [GetAllUserInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Get All Admin
    [GetAllAdminInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllAdminInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminAll = action.payload;
    },
    [GetAllAdminInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //? Get All user uncheck
    [GetAllUncheckInitiate.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllUncheckInitiate.fulfilled]: (state, action) => {
      state.loading = false;
      state.uncheck = action.payload;
    },
    [GetAllUncheckInitiate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationAdmin = AuthenticationAdminSlice.reducer;
export const { reset } = AuthenticationAdminSlice.actions;
export default AuthenticationAdmin;
