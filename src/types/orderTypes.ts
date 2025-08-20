export interface orderDetail {
    userdetail_id: number;
    payment_method: string;
    shipping_method: string;
}
export interface OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
}
export type OrderStatus =
    | 'pending'
    | 'shipped'
    | 'delivered'
    | 'confirmed';

export const statusClasses: Record<OrderStatus, string> = {
    pending: "bg-warning text-dark",
    confirmed: "bg-primary",
    shipped: "bg-info text-dark",
    delivered: "bg-success",
};

export interface AdminOrderItem {
    order_id: number;
    user_id: number;
    full_name: string;
    email: string;
    total: number;
    status: OrderStatus;
    payment_method: string;
    shipping_method: string;
    phone: string;
    address_line: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
}