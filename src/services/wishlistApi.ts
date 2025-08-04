import API from './axios';
import { MoveToCartRequest, WishlistItem } from '../types/wishlistTypes';

const getWishlist = async (): Promise<WishlistItem[]> => {
  const res = await API.get(`/api/wishlist`);
  return res.data.data;
};

const add = async (data: { product_id: number }): Promise<{ message: string }> => {
  const res = await API.post(`/api/wishlist`, data);
  return res.data;
};

const remove = async (product_id: number): Promise<{ message: string }>=> {
  const res = await API.delete(`/api/wishlist/${product_id}`);
  return res.data;
};

const moveToCart = async (data: MoveToCartRequest) => {
  const res = await API.post(`/api/wishlist/movetocart`, data);
  return res.data;
};

const wishlistApi = {
    getWishlistByUser: getWishlist,
    addToWishlist: add,
    removeFromWishlist: remove,
    moveToCartFromWishlist: moveToCart,
};

export default wishlistApi;