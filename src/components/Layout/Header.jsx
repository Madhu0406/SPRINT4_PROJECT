import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import '../../styles/layout.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const products = useSelector(state => state.products.items) || [];
  const searchRef = useRef();

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = products.filter(p =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.product_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  };

  return (
    <header className="fh-header">
      <div className="fh-logo">
        <Link to="/">FashionHub</Link>
      </div>
      <form className="fh-search-form" onSubmit={handleSearchSubmit} ref={searchRef} autoComplete="off">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search products"
          className="fh-search-input"
        />
        <button type="submit" className="fh-search-button" aria-label="Submit search">
          <FiSearch size={20} />
        </button>
        {showDropdown && searchResults.length > 0 && (
          <div className="fh-search-dropdown">
            {searchResults.slice(0, 6).map(product => (
              <Link
                to={`/product/${product.product_id}`}
                key={product.product_id}
                className="fh-search-dropdown-item"
                onClick={() => setShowDropdown(false)}
              >
                <span className="fh-search-dropdown-name">{product.product_name}</span>
              </Link>
            ))}
            {searchResults.length > 6 && (
              <div className="fh-search-dropdown-more">...and more</div>
            )}
          </div>
        )}
        {showDropdown && searchTerm.length > 0 && searchResults.length === 0 && (
          <div className="fh-search-dropdown fh-search-dropdown-empty">
            No products found.
          </div>
        )}
      </form>
      <button
        className="fh-hamburger"
        aria-label="Open navigation menu"
        onClick={() => setMobileMenuOpen(true)}
      >
        <FiMenu size={28} />
      </button>
      <nav className="fh-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>Browse</Link>
        {!user && (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
          </>
        )}
        {user && (
          <>
            <span style={{ marginLeft: "1.2rem", color: "#f8b6b6", fontWeight: "bold" }}>
              Hi, {user.firstName}
            </span>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "1rem",
                background: "#f8b6b6",
                color: "#222",
                border: "none",
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <div className={`fh-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <button
          className="fh-mobile-close"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        >
          <FiX size={28} />
        </button>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/browse" onClick={closeMenu}>Browse</Link>
        {!user && (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" onClick={closeMenu}>Register</Link>
          </>
        )}
        {user && (
          <>
            <span style={{ margin: "1rem 0", color: "#f8b6b6", fontWeight: "bold" }}>
              Hi, {user.firstName}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "#f8b6b6",
                color: "#222",
                border: "none",
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                margin: "1rem 0"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
      {mobileMenuOpen && <div className="fh-mobile-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
