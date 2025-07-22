import API from './axios'; // Adjust path
import { CartItem, AddToCartRequest, AdminCartItem } from '../types/cartTypes';

const fetchUserCart = async (): Promise<CartItem[]> => {
  const res = await API.get('/api/cart');
  return res.data.data;
};

const fetchAdminCart = async (): Promise<AdminCartItem[]> => {
  const res = await API.get('/api/admin/carts');
  return res.data.data;
};

const addToCart = async (data: AddToCartRequest): Promise<{ message: string }> => {
  const res = await API.post('/api/cart', data);
  return res.data;
};

const updateCart = async (productId: number, quantity: number): Promise<{ message: string }> => {
  const res = await API.put(`/api/cart/${productId}`, { quantity });
  return res.data;
};

const removeFromCart = async (productId: number): Promise<{ message: string }> => {
  const res = await API.delete(`/api/cart/${productId}`);
  return res.data;
};

const clearCart = async (): Promise<{ message: string }> => {
  const res = await API.delete(`/api/cart`);
  return res.data;
};

const cartApi = {
  getAllUser: fetchUserCart,
  getAllAdmin: fetchAdminCart,
  add: addToCart,
  update: updateCart,
  remove: removeFromCart,
  clear: clearCart,
};

export default cartApi;
