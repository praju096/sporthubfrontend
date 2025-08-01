import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WishlistItem } from "../../../types/wishlistTypes";
import wishlistApi from "../../../services/wishlistApi";

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
    async (userId: number, { rejectWithValue }) => {
        try {
            return await wishlistApi.getWishlistByUser(userId);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addWishlist = createAsyncThunk(
    "wishlist/addWishlist",
    async (
        data: { user_id: number; product_id: number },
        { rejectWithValue }
    ) => {
        try {
            await wishlistApi.addToWishlist(data);
            return data.product_id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const removeWishlist = createAsyncThunk(
    "wishlist/removeWishlist",
    async (
        { user_id, product_id }: { user_id: number; product_id: number },
        { rejectWithValue }
    ) => {
        try {
            await wishlistApi.removeFromWishlist(user_id, product_id);
            return product_id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const moveToCart = createAsyncThunk(
    "wishlist/moveToCart",
    async (
        { user_id, product_id }: { user_id: number; product_id: number },
        { rejectWithValue }
    ) => {
        try {
            await wishlistApi.moveToCartFromWishlist(user_id, product_id);
            return product_id;
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

            // Add Wishlist
            .addCase(addWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWishlist.fulfilled, (state) => {
                state.loading = false;
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
                state.wishlist = state.wishlist.filter(
                    (item) => item.product_id !== action.payload
                );
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Move to Cart
            .addCase(moveToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = state.wishlist.filter(
                    (item) => item.product_id !== action.payload
                );
            })
            .addCase(moveToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default wishlistSlice.reducer;
