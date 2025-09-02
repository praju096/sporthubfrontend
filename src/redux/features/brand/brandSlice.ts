import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandApi from "../../../services/brandApi";
import { Brand } from "../../../types/brandTypes";

interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk("brands/fetch", 
    async (_, { rejectWithValue }) => {
        try {
            const response = await brandApi.getAll();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load brands";
      });
  },
});

export default brandSlice.reducer;
