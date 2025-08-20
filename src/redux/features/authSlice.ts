import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser, LoginUser, AuthResponse } from '../../types/authTypes';
import userLoginRegisterApi from "../../services/userLoginRegisterApi";

interface AuthState {
  user: AuthResponse["user"] | null;
  loading: boolean;        // fetchCurrentUser
  actionLoading: boolean;  // for login/register/logout actions
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  actionLoading: false,
  error: null,
};

export const registerUsers = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUser, { rejectWithValue }) => {
    try {
      const data = await userLoginRegisterApi.registerUser(userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUsers = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginUser, { rejectWithValue }) => {
    try {
      const data = await userLoginRegisterApi.loginUser(userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const loginAdmins = createAsyncThunk(
  "auth/loginAdmin",
  async (userData: LoginUser, { rejectWithValue }) => {
    try {
      const data = await userLoginRegisterApi.loginAdmin(userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userLoginRegisterApi.userProfile()
      return response.data;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  }
);

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  await userLoginRegisterApi.logoutUser();
  return null;
});

export const adminLogout = createAsyncThunk("auth/adminLogout", async () => {
  await userLoginRegisterApi.logoutAdmin();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUsers.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(registerUsers.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.actionLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUsers.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(loginUsers.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.actionLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

       // Login Admin
      .addCase(loginAdmins.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(loginAdmins.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.actionLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginAdmins.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // get profile
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      })

      // logout user
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
      })

      //logout admin
      .addCase(adminLogout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
