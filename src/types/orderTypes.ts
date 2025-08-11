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