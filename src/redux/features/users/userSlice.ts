import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../../services/userApi";

interface User {
  id: number;
  fullname: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await userApi.fetchUsers();
    if (res.status === "success") return res.data;
    return rejectWithValue(res.message);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, role }: { id: number; role: string }, { rejectWithValue }) => {
    try {
      const res = await userApi.updateUserRole(id, role);
      if (res.status === "success") return { id, role };
      return rejectWithValue(res.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update role");
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: number, { rejectWithValue }) => {
  try {
    const res = await userApi.deleteUser(id);
    if (res.status === "success") return id;
    return rejectWithValue(res.message);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        const user = state.users.find((u) => u.id === id);
        if (user) user.role = role;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
  },
});

export default userSlice.reducer;
