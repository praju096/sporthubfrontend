export interface WishlistItem {
  wishlist_id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  image_url: string;
  price: number;
}

export interface MoveToCartRequest { 
  product_id: number;
}

export interface AdminWishlistItem {
  wishlist_id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  product_id: number;
  product_name: string;
  image_url: string;
  price: number;
}