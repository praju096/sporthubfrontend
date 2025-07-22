import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const current = location.pathname;

  const admin = useSelector((state: RootState) => state.auth.user);

  const isActive = (path: string) => current.includes(path);

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    toast.info("Admin Logged out");
    navigate('/admin/login');
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* Sidebar */}
        <div className="col-auto bg-dark text-white d-flex flex-column justify-content-between p-4" style={{ width: '250px' }}>
          <div>
            <h4 className="fw-bold mb-4">
              <i className="fas fa-building text-danger"></i> SPORTHUB
            </h4>

            <div className="border-top border-bottom pt-3 pb-3 d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-person-circle fs-1 text-secondary"></i>
              <div className="flex-grow-1">
                <div className="fw-bold">{admin?.fullname || "Admin User"}</div>
                <button className="btn btn-danger btn-sm w-100 mt-2" onClick={handleAdminLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i> Logout
                </button>
              </div>
            </div>

            <ul className="nav flex-column gap-2">
              <li><Link to="/admin/dashboard" className={`nav-link ${isActive('dashboard') ? 'active' : ''}`}><i className="fas fa-chart-pie me-2"></i> Dashboard</Link></li>
              <li><Link to="/admin/users" className={`nav-link ${isActive('users') ? 'active' : ''}`}><i className="fas fa-user me-2"></i> Users</Link></li>
              <li><Link to="/admin/shop" className={`nav-link ${isActive('shop') ? 'active' : ''}`}><i className="fas fa-archive me-2"></i> Products</Link></li>
              <li><Link to="/admin/categories" className={`nav-link ${isActive('categories') ? 'active' : ''}`}><i className="fas fa-copy me-2"></i> Categories</Link></li>
              <li><Link to="/admin/orders" className={`nav-link ${isActive('orders') ? 'active' : ''}`}><i className="fas fa-shipping-fast me-2"></i> Orders</Link></li>
              <li><Link to="/admin/wishlist" className={`nav-link ${isActive('wishlist') ? 'active' : ''}`}><i className="fas fa-heart me-2"></i> Wishlists</Link></li>
              <li><Link to="/admin/cart" className={`nav-link ${isActive('cart') ? 'active' : ''}`}><i className="fas fa-cart-plus me-2"></i> Carts</Link></li>
              <li><Link to="/admin/brands" className={`nav-link ${isActive('brands') ? 'active' : ''}`}><i className="fas fa-tag me-2"></i> Brands</Link></li>
              <li><Link to="/admin/contact-messages" className={`nav-link ${isActive('contact-messages') ? 'active' : ''}`}><i className="fas fa-phone me-2"></i> Contact Messages</Link></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col bg-light p-4 overflow-auto">
          <Outlet />
        </div>
      </div>

      <style>{`
        .nav-link {
          color: #bbb;
          font-weight: 500;
          padding: 10px;
          transition: all 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: #fff;
          background-color: #dc3545;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
