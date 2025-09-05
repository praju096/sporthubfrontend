import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../../../services/cartApi";
import {
  CartItem,
  AddToCartRequest,
  AdminCartItem,
} from "../../../types/cartTypes";
import { userLogout, loginUsers } from "../authSlice";

interface CartState {
  userCart: CartItem[];
  adminCart: AdminCartItem[];
  pendingCart: AddToCartRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  userCart: [],
  adminCart: [],
  pendingCart: localStorage.getItem("pendingCart")
    ? JSON.parse(localStorage.getItem("pendingCart") as string)
    : null,
  loading: false,
  error: null,
};

// ========== Thunks ==========

export const fetchUserCart = createAsyncThunk<CartItem[]>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getAllUser();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAdminCart = createAsyncThunk<AdminCartItem[]>(
  "cart/fetchAdminCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getAllAdmin();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addToCart = createAsyncThunk<CartItem[], AddToCartRequest>(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      await cartApi.add(data);
      return await cartApi.getAllUser();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateCart = createAsyncThunk<
  CartItem[],
  { productId: number; quantity: number }
>("cart/updateCart", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    await cartApi.update(productId, quantity);
    return await cartApi.getAllUser();
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeFromCart = createAsyncThunk<CartItem[], number>(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await cartApi.remove(productId);
      return await cartApi.getAllUser();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const clearCart = createAsyncThunk<CartItem[]>(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clear();
      return await cartApi.getAllUser();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ========== Slice ==========

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPendingCart: (state, action) => {
      state.pendingCart = action.payload;
      localStorage.setItem("pendingCart", JSON.stringify(action.payload));
    },
    clearPendingCart: (state) => {
      state.pendingCart = null;
      localStorage.removeItem("pendingCart");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart user
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.userCart = [];
      })

      // Fetch Cart admin
      .addCase(fetchAdminCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCart.fulfilled, (state, action) => {
        state.loading = false;
        state.adminCart = action.payload;
      })
      .addCase(fetchAdminCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Replay pendingCart after successful login
      .addCase(loginUsers.fulfilled, (state, action) => {
        if (state.pendingCart) {
          // We don’t call API here, just mark it so UI can dispatch addToCart
          // (to avoid circular thunk calls inside reducers)
        }
      });
  },
});

export const { setPendingCart, clearPendingCart } = cartSlice.actions;
export default cartSlice.reducer;
