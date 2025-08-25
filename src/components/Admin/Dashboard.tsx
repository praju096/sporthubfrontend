import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/features/users/userSlice';
import { fetchAllProducts } from '../../redux/features/products/productSlice';
import { fetchAdminWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { fetchOrdersAdmin } from '../../redux/features/order/orderSlice';
import { fetchAdminCart } from '../../redux/features/cart/cartSlice';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productCount = useSelector((state: RootState) => state.products.allProducts.length);
  const orderCount = useSelector((state: RootState) => state.order.adminOrders.length);
  const userCount = useSelector((state: RootState) => state.users.users.length);
  const cartCount = useSelector((state: RootState) => state.cart.adminCart.length);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.adminWishlist.length);
  const messageCount = 24;

  useEffect(() => {
      dispatch(fetchUsers());
      dispatch(fetchAdminWishlist());
      dispatch(fetchOrdersAdmin());
      dispatch(fetchAdminCart());
      dispatch(fetchAllProducts());
    }, [dispatch]);
    
  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-chart-pie text-danger`}></i> Dashboard Overview</h3>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products</h5>
            <p className="fs-4">{productCount}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-shipping-fast`}></i> Orders</h5>
            <p className="fs-4">{orderCount}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-user`}></i> Users</h5>
            <p className="fs-4">{userCount}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-clipboard`}></i> Messages</h5>
            <p className="fs-4">{messageCount}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products in cart</h5>
            <p className="fs-4">{cartCount}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products in wishlist</h5>
            <p className="fs-4">{wishlistCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;