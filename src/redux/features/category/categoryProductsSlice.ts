import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProductsByCategory } from "../../../services/categoryProductsApi";
import { Product } from "../../../types/productsTypes";

interface CategoryProductsState {
    categoryProducts: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryProductsState = {
    categoryProducts: [],
    loading: false,
    error: null,
};

export const fetchProductsByCategory = createAsyncThunk<
    Product[],
    string,
    { rejectValue: string }
>("categoryProducts/fetchProductsByCategory", async (category, { rejectWithValue }) => {
    try {
        const res = await getProductsByCategory(category);
        if (res.status === "success") {
            return res.data;
        }
        return rejectWithValue(res.message);
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch category products");
    }
});

const categoryProductsSlice = createSlice({
    name: "categoryProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.categoryProducts = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default categoryProductsSlice.reducer;
