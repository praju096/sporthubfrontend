import { AdminOrderItem, orderDetail, OrderStatus } from "../types/orderTypes";
import API from "./axios";

const Order = async (data: orderDetail): Promise<orderDetail> => {
    const res = await API.post(`/api/orders`, data);
    return res.data;
};
const fetchOrders = async (): Promise<orderDetail[]> => {
    const res = await API.get<{ data: orderDetail[] }>(`/api/orders/user`);
    return res.data.data;
};
const orderById = async (id: number): Promise<orderDetail> => {
    const res = await API.get(`/api/orders/${id}`);
    return res.data;
};
const allOrders = async (): Promise<AdminOrderItem[]> => {
    const res = await API.get<{ data: AdminOrderItem[] }>(`/api/orders`);
    return res.data.data;
};
const updateStatus = async (id: number, status: OrderStatus) => {
    const res = await API.patch(`/api/orders/${id}/status`, { status });
    return res.data;
};

const orderApi = {
    placeOrder: Order,
    getOrdersByUser: fetchOrders,
    getOrdersById: orderById,
    getAllOrders: allOrders,
    getUpdateStatus: updateStatus,
}
export default orderApi;