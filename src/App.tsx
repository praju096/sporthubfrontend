import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/loginRegister/Login';
import RegisterForm from './components/loginRegister/RegisterForm';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeScreen from './components/loginRegister/WelcomeScreen';
import Shop from './components/Shop/Shop';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import AdminLogin from './components/Admin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import ManageProducts from './components/Admin/Products/ManageProducts';
import ManageCategories from './components/Admin/ManageCategories';
import ManageOrders from './components/Admin/ManageOrder';
import ManageWishlist from './components/Admin/ManageWishlist';
import ManageCart from './components/Admin/ManageCart';
import ManageUsers from './components/Admin/ManageUsers';
import ContactMessages from './components/Admin/ContactMessages';
import ManageBrands from './components/Admin/ManageBrands';
// import Order from './components/Navbar/Order';
import PrivateRoute from './PrivateRoutes';
import ProductDetail from './components/ProductDetail';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchCurrentUser } from './redux/features/authSlice';
import AdminPrivateRoute from './AdminPrivateRoute';
import { fetchUserCart } from './redux/features/cart/cartSlice';
import { fetchWishlist } from './redux/features/wishlist/wishlistSlice';
import Checkout from './components/Checkout/Checkout';
import OrdersPage from './components/Order/OrdersPage';
import OrderDetails from './components/Order/OrderDetails';
import TrackOrder from './components/Order/TrackOrder';
import ReturnsExchanges from './components/Order/ReturnsExchanges';
import ShippingInfo from './components/Order/ShippingInfo';
import FAQ from './components/Order/FAQ';
import MerchantLogin from './components/Merchant/MerchantLogin';
import MerchantPrivateRoute from './MerchantPrivateRoute';
import MerchantLayout from './components/Merchant/MerchantLayout';
import DeliveryPartnerLogin from './components/DeliveryPartner/DeliveryPartnerLogin';
import DeliveryPartnerLayout from './components/DeliveryPartner/DeliveryPartnerLayout';
import DeliveryPartnerPrivateRoute from './DeliveryPartnerPrivateRoutes';


const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/merchant") ||
    location.pathname.includes("/deliverypartner") ||
    location.pathname === "/welcome";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchUserCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <LayoutWrapper>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path='/categories' element={<Categories />} />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/orders/:id' element={<OrderDetails />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/shipping-info" element={<ShippingInfo />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/welcome" element={<WelcomeScreen />} />

          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="shop" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="wishlist" element={<ManageWishlist />} />
              <Route path="cart" element={<ManageCart />} />
              <Route path="brands" element={<ManageBrands />} />
              <Route path="contact-messages" element={<ContactMessages />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
          </Route>

          <Route path="/merchant" element={<Navigate to="/merchant/login" />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />
          <Route element={<MerchantPrivateRoute />}>
            <Route path="/merchant" element={<MerchantLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="shop" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="brands" element={<ManageBrands />} />
            </Route>
          </Route>

          <Route path="/deliverypartner" element={<Navigate to="/deliverypartner/login" />} />
          <Route path="/deliverypartner/login" element={<DeliveryPartnerLogin />} />
          <Route element={<DeliveryPartnerPrivateRoute />}>
            <Route path="/deliverypartner" element={<DeliveryPartnerLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>
          </Route>

        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

export default App;

