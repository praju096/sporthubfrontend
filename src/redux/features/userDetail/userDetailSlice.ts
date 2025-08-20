import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userDetailApi from "../../../services/userDetailApi";
import { userDetail, userDetailData } from "../../../types/userDetailTypes";

interface userDetailState {
  userDetail: userDetail[];
  loading: boolean;
  error: string | null;
}

const initialState: userDetailState = {
  userDetail: [],
  loading: false,
  error: null,
};

// FETCH user details
export const fetchUserDetail = createAsyncThunk(
  "userDetail/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userDetailApi.getUserDetail();
      return res; // array
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user detail");
    }
  }
);

// ADD user detail
export const addUserDetail = createAsyncThunk(
  "userDetail/add",
  async (payload: userDetailData, { rejectWithValue }) => {
    try {
      const res = await userDetailApi.addUserDetail(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add user detail");
    }
  }
);

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload; // array
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // add
      .addCase(addUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        // state.userDetail.push(action.payload);
      })
      .addCase(addUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userDetailSlice.reducer;
