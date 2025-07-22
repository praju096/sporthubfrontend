export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  image_url: string;
  price: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface AdminCartItem {
  cart_id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  product_id: number;
  product_name: string;
  image_url: string;
  price: number;
  quantity: number;
}

