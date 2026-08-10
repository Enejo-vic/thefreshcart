import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import "../styles/header.css";
import { cartItemCount } from "../utils/cartStorage";

const Header = () => {
  const [cartCount, setCartCount] = useState(cartItemCount());
  const [user, setUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // =========================
  // USER
  // =========================

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    window.addEventListener("login", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("login", loadUser);
    };
  }, []);

  // =========================
  // CART
  // =========================

  useEffect(() => {
    const onCartChange = () => {
      setCartCount(cartItemCount());
    };

    window.addEventListener(
      "freshcart-cart-updated",
      onCartChange
    );

    return () => {
      window.removeEventListener(
        "freshcart-cart-updated",
        onCartChange
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("freshcartLoggedIn");

    setUser(null);
    setUserMenuOpen(false);

    window.dispatchEvent(new Event("login"));
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">

      {/* ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <p>
          Free shipping on orders over $50
          <span>•</span>
          Fresh groceries delivered to your door
        </p>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="main-navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <Link
            to="/"
            className="freshcart-logo"
            onClick={closeMobileMenu}
          >
            <div className="logo-icon">
              <FiShoppingCart />
            </div>

            <span>FreshCart</span>
          </Link>

          {/* NAVIGATION LINKS */}
          <div
            className={`nav-links ${
              menuOpen ? "nav-links-open" : ""
            }`}
          >
            <NavLink
              to="/"
              end
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              About Us
            </NavLink>
          </div>

          {/* RIGHT SIDE */}
          <div className="header-actions">

            {/* CART */}
            <Link
              to="/cart"
              className="header-cart"
              aria-label="Shopping cart"
            >
              <FiShoppingCart />

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div className="user-menu">

                <button
                  className="user-trigger"
                  onClick={() =>
                    setUserMenuOpen(!userMenuOpen)
                  }
                >
                  <div className="avatar">
                    {user.name
                      ? user.name
                          .charAt(0)
                          .toUpperCase()
                      : <FiUser />}
                  </div>

                  <span className="user-name">
                    {user.name || "Account"}
                  </span>

                  <FiChevronDown
                    className={`dropdown-arrow ${
                      userMenuOpen
                        ? "dropdown-arrow-open"
                        : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">

                    <div className="dropdown-user-info">
                      <span>Signed in as</span>
                      <strong>
                        {user.name || "FreshCart User"}
                      </strong>
                    </div>

                    <div className="dropdown-divider"></div>

                    <Link
                      to="/profile"
                      onClick={() =>
                        setUserMenuOpen(false)
                      }
                    >
                      <FiUser />
                      Profile
                    </Link>

                    <button onClick={handleLogout}>
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/signup"
                className="signup-button"
              >
                Sign Up
              </Link>
            )}

            {/* MOBILE BUTTON */}
            <button
              className="mobile-menu-button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;