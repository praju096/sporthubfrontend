import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { userCart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const [isExpanded, setIsExpanded] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active fw-bold border-bottom border-danger border-2' : ''}`;

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
          <span className="text-danger">SPORT</span>HUB
        </NavLink>

        <div className="d-flex align-items-center d-lg-none">
          {!user ? (
            <div className="d-flex">
              <NavLink to="/login" className="btn btn-outline-light me-2" onClick={closeNavbar}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-danger" onClick={closeNavbar}>
                Register
              </NavLink>
            </div>
          ) : (
            <AvatarDropdown />
          )}
          
          <button
            className="navbar-toggler ms-2"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/shop" onClick={closeNavbar}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/categories" onClick={closeNavbar}>
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about" onClick={closeNavbar}>
                About
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item position-relative">
                  <NavLink className={navLinkClass} to="/wishlist" onClick={closeNavbar}>
                    <i className="fa fa-heart fs-5"></i>
                    {wishlist.length > 0 && (
                      <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                        {wishlist.length}
                        <span className="visually-hidden">wishlist items</span>
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className={navLinkClass} to="/cart" onClick={closeNavbar}>
                    <i className="fa fa-shopping-cart fs-5"></i>
                    {userCart.length > 0 && (
                      <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                        {userCart.length}
                        <span className="visually-hidden">cart items</span>
                      </span>
                    )}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          
          <div className="d-none d-lg-flex ms-3">
            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-outline-light me-2" onClick={closeNavbar}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-danger" onClick={closeNavbar}>
                  Register
                </NavLink>
              </>
            ) : (
              <AvatarDropdown />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;