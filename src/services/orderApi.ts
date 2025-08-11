import { orderDetail } from "../types/orderTypes";
import API from "./axios";

const Order = async (data: orderDetail): Promise<orderDetail> => {
    const res = await API.post(`/api/orders`, data);
    return res.data;
};
const fetchOrders = async (): Promise<orderDetail[]> =>{
    const res = await API.get<{ data: orderDetail[] }>(`/api/orders/user`);
    return res.data.data;
};
const orderById = async (id: number): Promise<orderDetail> => {
    const res = await API.get(`/api/orders/${id}`);
    return res.data;
};
const orderApi = {
    placeOrder: Order,
    getOrdersByUser: fetchOrders,
    getOrdersById: orderById,
}
export default orderApi;