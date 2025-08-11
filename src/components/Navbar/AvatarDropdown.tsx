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
        className="btn btn-outline-light rounded-circle d-flex align-items-center"
        id="avatarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle fs-5"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="avatarDropdown">
        <li className="px-4 py-3 text-center">
          <i className="bi bi-person-circle fs-1 text-secondary"></i>
          <p className="mb-0 mt-2 fw-bold text-truncate">{name}</p>
          <p className="mb-0 small text-truncate">{email}</p>
        </li>
        <li><hr className="dropdown-divider mx-3" /></li>
        <li>
          <Link className="dropdown-item d-flex align-items-center justify-content-center gap-2 py-2 btn btn-outline-danger" to="/orders">
            <i className="bi bi-bag"></i>
            <span>My Orders</span>
          </Link>
        </li>
        <li>
          <button 
            className="dropdown-item d-flex align-items-center justify-content-center gap-2 py-2 text-danger btn btn-outline-danger" 
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AvatarDropdown;