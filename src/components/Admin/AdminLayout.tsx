import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const current = location.pathname;

  const admin = useSelector((state: RootState) => state.auth.user);

  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => current.includes(path);

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    toast.info("Admin Logged out");
    navigate('/admin/login');
  };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white d-flex flex-column justify-content-between p-3 sidebar ${collapsed ? 'collapsed' : ''}`}
        style={{ width: collapsed ? '80px' : '250px', transition: 'width 0.3s' }}
      >
        <div>
          {/* Toggle button */}
          <button
            className="btn btn-sm btn-light mb-3"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>

          <h5 className={`fw-bold mb-4 ${collapsed ? 'd-none' : ''}`}>
            <i className="fas fa-building text-danger"></i> SPORTHUB
          </h5>

          <div className="border-top border-bottom pt-3 pb-3 d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-person-circle fs-1 text-secondary"></i>
            <div className={`flex-grow-1 ${collapsed ? 'd-none' : ''}`}>
              <div className="fw-bold">{admin?.fullname || "Admin User"}</div>
              <button className="btn btn-danger btn-sm w-100 mt-2" onClick={handleAdminLogout}>
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </div>
          </div>

          <ul className="nav flex-column gap-2">
            <li><Link to="/admin/dashboard" className={`nav-link ${isActive('dashboard') ? 'active' : ''}`}><i className="fas fa-chart-pie me-2"></i> {!collapsed && 'Dashboard'}</Link></li>
            <li><Link to="/admin/users" className={`nav-link ${isActive('users') ? 'active' : ''}`}><i className="fas fa-user me-2"></i> {!collapsed && 'Users'}</Link></li>
            <li><Link to="/admin/shop" className={`nav-link ${isActive('shop') ? 'active' : ''}`}><i className="fas fa-archive me-2"></i> {!collapsed && 'Products'}</Link></li>
            <li><Link to="/admin/categories" className={`nav-link ${isActive('categories') ? 'active' : ''}`}><i className="fas fa-copy me-2"></i> {!collapsed && 'Categories'}</Link></li>
            <li><Link to="/admin/orders" className={`nav-link ${isActive('orders') ? 'active' : ''}`}><i className="fas fa-shipping-fast me-2"></i> {!collapsed && 'Orders'}</Link></li>
            <li><Link to="/admin/wishlist" className={`nav-link ${isActive('wishlist') ? 'active' : ''}`}><i className="fas fa-heart me-2"></i> {!collapsed && 'Wishlists'}</Link></li>
            <li><Link to="/admin/cart" className={`nav-link ${isActive('cart') ? 'active' : ''}`}><i className="fas fa-cart-plus me-2"></i> {!collapsed && 'Carts'}</Link></li>
            <li><Link to="/admin/brands" className={`nav-link ${isActive('brands') ? 'active' : ''}`}><i className="fas fa-tag me-2"></i> {!collapsed && 'Brands'}</Link></li>
            <li><Link to="/admin/contact-messages" className={`nav-link ${isActive('contact-messages') ? 'active' : ''}`}><i className="fas fa-phone me-2"></i> {!collapsed && 'Contact Messages'}</Link></li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 bg-light p-4" style={{ overflowY: 'auto' }}>
        <Outlet />
      </div>

      <style>{`
        .nav-link {
          color: #bbb;
          font-weight: 500;
          padding: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }
        .nav-link:hover, .nav-link.active {
          color: #fff;
          background-color: #dc3545;
          border-radius: 8px;
        }
        .sidebar.collapsed .nav-link {
          justify-content: center;
        }
        .sidebar.collapsed .nav-link i {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
