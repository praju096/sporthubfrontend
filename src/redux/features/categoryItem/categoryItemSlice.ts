import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesItemApi from "../../../services/categoriesItem";
import { categoriesItem, categoriesItemApiResponse } from "../../../types/categoriesItemTypes";

interface CategoryItemState {
    categoriesItem: categoriesItem[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryItemState = {
    categoriesItem: [],
    loading: false,
    error: null,
};

export const fetchCategoriesItem = createAsyncThunk<categoriesItemApiResponse>("categoriesItem/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoriesItemApi.getAll();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesItem.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesItem = action.payload.data;
            })
            .addCase(fetchCategoriesItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load categories";
            });
    },
});

export default categorySlice.reducer;
