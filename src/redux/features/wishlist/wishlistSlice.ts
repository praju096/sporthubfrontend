import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddToWishlistRequest, AdminWishlistItem, MoveToCartRequest, WishlistItem } from "../../../types/wishlistTypes";
import wishlistApi from "../../../services/wishlistApi";
import { loginUsers, userLogout } from "../authSlice";

interface WishlistState {
    wishlist: WishlistItem[];
    adminWishlist: AdminWishlistItem[];
    pendingWishlist: AddToWishlistRequest | null;
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    wishlist: [],
    adminWishlist: [],
    pendingWishlist: localStorage.getItem("pendingWishlist")
        ? JSON.parse(localStorage.getItem("pendingWishlist") as string)
        : null,
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk<WishlistItem[]>(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            return await wishlistApi.getWishlistByUser();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchAdminWishlist = createAsyncThunk<AdminWishlistItem[]>(
    "cart/fetchAdminWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await wishlistApi.getAdminWishlist();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addWishlist = createAsyncThunk<
    WishlistItem[],
    AddToWishlistRequest
>(
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
    reducers: {
        setPendingWishlist: (state, action) => {
            state.pendingWishlist = action.payload;
            localStorage.setItem("pendingWishlist", JSON.stringify(action.payload));
        },
        clearPendingWishlist: (state) => {
            state.pendingWishlist = null;
            localStorage.removeItem("pendingWishlist");
        },
    },
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

            // Fetch Wishlist user
            .addCase(fetchAdminWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.adminWishlist = action.payload;
            })
            .addCase(fetchAdminWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
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
            })

            // Replay pendingWishlist after login
            .addCase(loginUsers.fulfilled, (state, action) => {
                if (state.pendingWishlist) {
                    // We don’t call API here, just mark it so UI can dispatch addToWishlist
                    // (to avoid circular thunk calls inside reducers)
                }
            });
    },
});

export const { setPendingWishlist, clearPendingWishlist } =
    wishlistSlice.actions;
export default wishlistSlice.reducer;
