import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/features/authSlice';
import productReducer from './redux/features/products/productSlice';
import categoryProductsReducer from "./redux/features/category/categoryProductsSlice";
import userReducer from "./redux/features/users/userSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categoryProducts: categoryProductsReducer,
    users: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

