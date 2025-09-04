import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import categoriesItemApi from "../../../services/categoriesItemApi";
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

export const addCategoriesItem = createAsyncThunk(
    "categoriesItem/add",
    async (categoriesItem: { category_name: string }, { rejectWithValue }) => {
        try {
            const newCategoriesItem = await categoriesItemApi.create(categoriesItem);
            return newCategoriesItem;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to add brand");
        }
    }
);

export const updateCategoriesItem = createAsyncThunk(
    "brands/update",
    async ({ id, categoriesItem }: { id: number; categoriesItem: { category_name: string } }, { rejectWithValue }) => {
        try {
            const updatedCategoriesItem = await categoriesItemApi.update(id, categoriesItem);
            return updatedCategoriesItem;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update brand");
        }
    }
);

export const deleteCategoriesItem = createAsyncThunk(
    "brands/delete",
    async (id: number, { rejectWithValue }) => {
        try {
            await categoriesItemApi.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete brand");
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch CategoriesItem
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
            })

            // Add CategoriesItem
            .addCase(addCategoriesItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategoriesItem.fulfilled, (state, action: PayloadAction<categoriesItem>) => {
                state.loading = false;
                state.categoriesItem.push(action.payload);
            })
            .addCase(addCategoriesItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update CategoriesItem
            .addCase(updateCategoriesItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategoriesItem.fulfilled, (state, action: PayloadAction<categoriesItem>) => {
                state.loading = false;
                const index = state.categoriesItem.findIndex(b => b.category_id === action.payload.category_id);
                if (index !== -1) {
                    state.categoriesItem[index] = action.payload;
                }
            })
            .addCase(updateCategoriesItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete brand
            .addCase(deleteCategoriesItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoriesItem.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.categoriesItem = state.categoriesItem.filter((b) => b.category_id !== action.payload);
            })
            .addCase(deleteCategoriesItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default categorySlice.reducer;
