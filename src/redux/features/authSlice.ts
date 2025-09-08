import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser, LoginUser, AuthResponse } from '../../types/authTypes';
import userLoginRegisterApi from "../../services/userLoginRegisterApi";

interface AuthState {
  user: AuthResponse["user"] | null;
  loading: boolean;
  actionLoading: boolean;
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

export const loginMerchant = createAsyncThunk(
  "auth/loginMerchant",
  async (userData: LoginUser, { rejectWithValue }) => {
    try {
      const data = await userLoginRegisterApi.loginMerchant(userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const loginDeliveryPartner = createAsyncThunk(
  "auth/loginDeliveryPartner",
  async (userData: LoginUser, { rejectWithValue }) => {
    try {
      const data = await userLoginRegisterApi.loginDeliveryPartner(userData);
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

export const merchantLogout = createAsyncThunk("auth/merchantLogout", async () => {
  await userLoginRegisterApi.logoutMerchant();
  return null;
});

export const deliveryPartnerLogout = createAsyncThunk("auth/deliveryPartnerLogout", async () => {
  await userLoginRegisterApi.logoutDeliveryPartner();
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

      // Login merchant
      .addCase(loginMerchant.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(loginMerchant.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.actionLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginMerchant.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      // Login delivery partner
      .addCase(loginDeliveryPartner.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(loginDeliveryPartner.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.actionLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginDeliveryPartner.rejected, (state, action) => {
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
      })

      //logout merchant
      .addCase(merchantLogout.fulfilled, (state) => {
        state.user = null;
      })

      //logout delivery Partner
      .addCase(deliveryPartnerLogout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
