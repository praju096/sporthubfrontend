import API from './axios';
import { WishlistItem } from '../types/wishlistTypes';

const getWishlist = async (userId: number): Promise<WishlistItem[]> => {
  const res = await API.get(`/api/wishlist/${userId}`);
  return res.data;
};

const add = async (data: { user_id: number; product_id: number }) => {
  const res = await API.post(`/api/wishlist`, data);
  return res.data;
};

const remove = async (user_id: number, product_id: number) => {
  const res = await API.delete(`/api/wishlist`, {
    data: { user_id, product_id },
  });
  return res.data;
};

const moveToCart = async (user_id: number, product_id: number) => {
  const res = await API.post(`/api/wishlist/movetocart`, { user_id, product_id });
  return res.data;
};

const wishlistApi = {
    getWishlistByUser: getWishlist,
    addToWishlist: add,
    removeFromWishlist: remove,
    moveToCartFromWishlist: moveToCart,
};

export default wishlistApi;