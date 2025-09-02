import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/features/authSlice';
import productReducer from './redux/features/products/productSlice';
import categoryProductsReducer from "./redux/features/category/categoryProductsSlice";
import userReducer from "./redux/features/users/userSlice";
import cartReducer from "./redux/features/cart/cartSlice";
import wishlistReducer from "./redux/features/wishlist/wishlistSlice";
import userDetailReducer from './redux/features/userDetail/userDetailSlice';
import orderReducer from './redux/features/order/orderSlice';
import contactReducer from './redux/features/contact/contactSlice';
import categoryReducer from "./redux/features/categoryItem/categoryItemSlice";
import brandReducer from "./redux/features/brand/brandSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categoryProducts: categoryProductsReducer,
    users: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    userDetail: userDetailReducer,
    order: orderReducer,
    contact: contactReducer,
    categories: categoryReducer,
    brands: brandReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

