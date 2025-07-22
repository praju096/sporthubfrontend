// import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../store';
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AvatarDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const name = useSelector((state: RootState) => state.auth.user?.fullname);

  const handleLogout = async () => {

    try {
      // await API.post("/api/auth/logout");
    } catch { }
    dispatch(userLogout());
    toast.info("Logged out");
    navigate("/login");
  };


  return (
    <div className="dropdown">
      <button
        className="btn rounded-circle d-flex align-items-center avatar-button"
        id="avatarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle fs-5 text-white"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
        <li className="dropdown-item text-center">
          <i className="bi bi-person-circle fs-1 text-secondary"></i>
          <p className="mb-0 mt-2 fw-bold">{name}</p>
          <p className="mb-0 mt-2 small">{email}</p>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger text-center">
            <Link className="nav-link" to="/order">My Orders</Link>
          </button>
        </li>
        <li>
          <button className="dropdown-item text-danger text-center" onClick={handleLogout}>
            Sign Out
          </button>
        </li>
      </ul>

      {/* Custom Styles */}
      <style>{`
        
        .dropdown-menu {
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          min-width: 200px;
        }

        .dropdown-item {
          transition: background-color 0.3s;
        }

        .dropdown-item:hover {
          background-color: rgba(255, 71, 87, 0.1); /* Light hover effect */
        }

        .dropdown-divider {
          border-color: #ff4757; /* Match the primary color */
        }

        .text-danger {
          font-weight: bold;
        }

        .text-secondary {
          color: #6c757d; /* Bootstrap secondary color */
        }
      `}</style>
    </div>
  );
};

export default AvatarDropdown;
