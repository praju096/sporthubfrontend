import { orderDetail } from "../types/orderTypes";
import API from "./axios";

export const placeOrder = async (data:orderDetail): Promise<orderDetail> => {
    const res = await API.post("/api/orders", data);
    return res.data;
};
