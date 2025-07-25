import React from "react";
import { NavLink } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItemCount = 5;
  const wishlistItemCount = 3;

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
  `nav-link ${isActive ? 'active fw-bold border-bottom border-danger border-2' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <span className="text-danger">SPORT</span>HUB
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={navLinkClass}
                to="/"
                end // This ensures home is only active when exactly "/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about">
                About
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/wishlist">
                    <i className="fa fa-heart fs-5"></i>
                    {wishlistItemCount > 0 && (
                      <span
                        className="position-absolute text-danger"
                        style={{ top: "0.2rem" }}
                      >
                        {wishlistItemCount}
                        <span className="visually-hidden">wishlist items</span>
                      </span>
                    )}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/cart">
                    <i className="fa fa-shopping-cart fs-5"></i>
                    {cartItemCount > 0 && (
                      <span
                        className="position-absolute text-danger"
                        style={{ top: "0.2rem" }}
                      >
                        {cartItemCount}
                        <span className="visually-hidden">cart items</span>
                      </span>
                    )}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex ms-3">
            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-outline-light me-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-danger">
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
