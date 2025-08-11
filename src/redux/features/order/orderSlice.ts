import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderDetail } from "../../../types/orderTypes";
import orderApi from "../../../services/orderApi";


interface OrderState {
  orders: orderDetail[];
  currentOrder: orderDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const userPlaceOrder = createAsyncThunk(
  "order/place",
  async (
    payload: { userdetail_id: number; payment_method: string; shipping_method: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderApi.placeOrder(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrdersByUser();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Fetch Order By ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrdersById(id);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(userPlaceOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userPlaceOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userPlaceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Order By ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
