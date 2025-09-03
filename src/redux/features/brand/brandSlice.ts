import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

export const fetchBrands = createAsyncThunk(
  "brands/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await brandApi.getAll();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addBrand = createAsyncThunk(
  "brands/add",
  async (brand: { brand_name: string }, { rejectWithValue }) => {
    try {
      const newBrand = await brandApi.create(brand);
      return newBrand;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add brand");
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brands/update",
  async ({ id, brand }: { id: number; brand: { brand_name: string } }, { rejectWithValue }) => {
    try {
      const updatedBrand = await brandApi.update(id, brand);
      return updatedBrand;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update brand");
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await brandApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete brand");
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch brands
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to load brands";
      })

      // Add brand
      .addCase(addBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update brand
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.loading = false;
        const index = state.brands.findIndex(b => b.brand_id === action.payload.brand_id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.brands = state.brands.filter((b) => b.brand_id !== action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default brandSlice.reducer;