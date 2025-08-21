import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const admin = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    toast.info("Admin Logged out");
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const navItems = [
    { path: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { path: '/admin/users', icon: 'fa-user', label: 'Users' },
    { path: '/admin/shop', icon: 'fa-archive', label: 'Products' },
    { path: '/admin/categories', icon: 'fa-copy', label: 'Categories' },
    { path: '/admin/orders', icon: 'fa-shipping-fast', label: 'Orders' },
    { path: '/admin/wishlist', icon: 'fa-heart', label: 'Wishlists' },
    { path: '/admin/cart', icon: 'fa-cart-plus', label: 'Carts' },
    { path: '/admin/brands', icon: 'fa-tag', label: 'Brands' },
    { path: '/admin/contact-messages', icon: 'fa-phone', label: 'Contact Messages' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="container-fluid p-0 vh-100 bg-light position-relative">
      <header className="d-lg-none d-flex align-items-center bg-dark text-white p-3 sticky-top shadow-sm z-3">
        <button 
          className="btn btn-link text-white me-2"
          onClick={toggleMobileSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars fs-4"></i>
        </button>
        <h4 className="fw-bold mb-0 text-truncate">
          <i className="fas fa-building text-danger me-2"></i> SPORTHUB
        </h4>
      </header>

      <div className="row g-0 h-100 mw-100">
        <aside 
          className={`d-none d-lg-flex flex-column bg-dark text-white p-0 h-100
            ${sidebarCollapsed ? 'col-auto' : 'col-lg-2'}`}
        >
          <div className="d-flex flex-column h-100 w-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              {!sidebarCollapsed && (
                <h4 className="fw-bold mb-0 text-truncate">
                  <i className="fas fa-building text-danger me-2"></i> SPORTHUB
                </h4>
              )}
              <button 
                className="btn btn-link text-white p-0"
                onClick={toggleSidebar}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
              </button>
            </div>

            <div className="border-top border-secondary border-bottom pt-3 pb-3 d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-person-circle fs-1 text-secondary"></i>
              {!sidebarCollapsed && (
                <div className="flex-grow-1">
                  <div className="fw-bold text-truncate">{admin?.fullname || "Admin User"}</div>
                  <button 
                    className="btn btn-danger btn-sm w-100 mt-2" 
                    onClick={handleAdminLogout}
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>

            <nav className="flex-grow-1 overflow-auto">
              <ul className="nav flex-column gap-2">
                {navItems.map((item) => (
                  <li key={item.path} className="nav-item">
                    <Link 
                      to={item.path} 
                      className={`nav-link rounded d-flex align-items-center ${isActive(item.path) ? 'bg-danger text-white' : 'text-white-50 hover-bg-danger hover-text-white'}`}
                    >
                      <i className={`fas ${item.icon} ${sidebarCollapsed ? 'fs-5 mx-auto' : 'me-2'}`}></i>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {mobileSidebarOpen && (
          <>
            <aside className="position-fixed start-0 h-100 z-3 col-8 bg-dark text-white p-3 shadow-lg">
              <div className="d-flex flex-column h-100 w-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0 text-truncate">
                    <i className="fas fa-building text-danger me-2"></i> SPORTHUB
                  </h4>
                  <button 
                    className="btn btn-link text-white p-0"
                    onClick={toggleMobileSidebar}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="border-top border-secondary border-bottom pt-3 pb-3 d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-person-circle fs-1 text-secondary"></i>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-truncate">{admin?.fullname || "Admin User"}</div>
                    <button 
                      className="btn btn-danger btn-sm w-100 mt-2" 
                      onClick={handleAdminLogout}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Logout
                    </button>
                  </div>
                </div>

                <nav className="flex-grow-1 overflow-auto">
                  <ul className="nav flex-column gap-2">
                    {navItems.map((item) => (
                      <li key={item.path} className="nav-item">
                        <Link 
                          to={item.path} 
                          className={`nav-link rounded d-flex align-items-center ${isActive(item.path) ? 'bg-danger text-white' : 'text-white-50 hover-bg-danger hover-text-white'}`}
                        >
                          <i className={`fas ${item.icon} me-2`}></i>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-2 d-lg-none"
              onClick={toggleMobileSidebar}
            />
          </>
        )}
  
        <main className="col p-0 overflow-auto h-100">
          <div className="p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;