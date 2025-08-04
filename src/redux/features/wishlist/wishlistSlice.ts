import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MoveToCartRequest, WishlistItem } from "../../../types/wishlistTypes";
import wishlistApi from "../../../services/wishlistApi";
import { userLogout } from "../authSlice";

interface WishlistState {
    wishlist: WishlistItem[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    wishlist: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            return await wishlistApi.getWishlistByUser();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addWishlist = createAsyncThunk(
    "wishlist/addWishlist",
    async (
        data: { product_id: number },
        { rejectWithValue }
    ) => {
        try {
            await wishlistApi.addToWishlist(data);
            return wishlistApi.getWishlistByUser();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const removeWishlist = createAsyncThunk<WishlistItem[], number>(
    "wishlist/removeWishlist",
    async (product_id, { rejectWithValue }) => {
        try {
            await wishlistApi.removeFromWishlist(product_id);
            return await wishlistApi.getWishlistByUser();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const moveToCartWishlist = createAsyncThunk<WishlistItem[], MoveToCartRequest>(
    "wishlist/moveToCart",
    async (
        data, { rejectWithValue }) => {
        try {
            await wishlistApi.moveToCartFromWishlist(data);
            return await wishlistApi.getWishlistByUser();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.wishlist = [];
            })

            // Add Wishlist
            .addCase(addWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Remove Wishlist
            .addCase(removeWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Move to Cart
            .addCase(moveToCartWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveToCartWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(moveToCartWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default wishlistSlice.reducer;
