export interface orderDetail {
    id?: number;
    userdetail_id: number;
    payment_method: string;
    shipping_method: string;
    status?: string;
    total?: string;
    created_at?: string;
    expected_delivery?: string;
    delivered_at?: string;
}
export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product_name: string;
    product_image: string;
}
export interface ReviewData {
    title: string;
    rating: number;
    comment: string;
}

export interface orderCurrentStates {
    data: {
        order: orderDetail;
        items: OrderItem[];
    };
}

export type OrderStatus =
    | 'pending'
    | 'shipped'
    | 'delivered'
    | 'confirmed';

export const statusClasses: Record<OrderStatus, string> = {
    pending: "bg-danger",
    confirmed: "bg-danger",
    shipped: "bg-danger",
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
    expected_delivery: string;
    delivered_at: string;
}