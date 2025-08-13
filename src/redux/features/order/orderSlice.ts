import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminOrderItem, orderDetail, OrderStatus } from "../../../types/orderTypes";
import orderApi from "../../../services/orderApi";


interface OrderState {
  orders: orderDetail[];
  currentOrder: orderDetail | null;
  adminOrders: AdminOrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  adminOrders: [],
  loading: false,
  error: null,
};

export const userPlaceOrder = createAsyncThunk(
  "order/userPlaceOrder",
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
export const fetchOrdersUser = createAsyncThunk(
  "order/fetchOrdersUser",
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
  "order/fetchOrderById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrdersById(id);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
  }
);

export const fetchOrdersAdmin = createAsyncThunk(
  "order/fetchOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await orderApi.getAllOrders();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const updateAdminStatus = createAsyncThunk(
  "users/updateAdminStatus",
  async ({ id, status }: { id: number; status: OrderStatus }, { rejectWithValue }) => {
    try {
      const res = await orderApi.getUpdateStatus(id, status);
      if (res.status === "success") return { id, status };
      return rejectWithValue(res.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update role");
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
      .addCase(fetchOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Orders Admin
      .addCase(fetchOrdersAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
      })
      .addCase(fetchOrdersAdmin.rejected, (state, action) => {
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
      })

      // Update status
      .addCase(updateAdminStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const adminOrder = state.adminOrders.find((u) => u.order_id === id);
        if (adminOrder) adminOrder.status = status;
      });
  },
});

export default orderSlice.reducer;
