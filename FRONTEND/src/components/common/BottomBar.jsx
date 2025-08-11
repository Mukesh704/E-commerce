import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoryContext';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

const BottomBar = () => {
  const { categories } = useCategories();
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-white px-4 py-3 relative text-sm">
      <div className="hidden md:flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* All Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <div className="bg-black text-white hover:bg-gray-300 hover:text-black flex items-center gap-2 font-semibold cursor-pointer px-5 py-2 rounded-lg transition">
              <IoMenu />
              <span>All Categories</span>
            </div>

            {showCategories && (
              <div
                className="absolute left-0 top-full w-64 bg-white text-black shadow-md z-10"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                {categories.map((category) => (
                  <Link
                    to={`/products?category=${category._id}`}
                    key={category._id}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Feature Section Links */}
          <button onClick={() => scrollToSection('best-sellers')} className="font-semibold hover:text-gray-500 transition">
            Best Sellers
          </button>
          <button onClick={() => scrollToSection('deals')} className="font-semibold hover:text-gray-500 transition">
            Deals of the Day
          </button>
          <button onClick={() => scrollToSection('new-arrivals')} className="font-semibold hover:text-gray-500 transition">
            New Arrivals
          </button>
          <button onClick={() => scrollToSection('discounted')} className="font-semibold hover:text-gray-500 transition">
            Discounted Products
          </button>

          <Link to="/about" className="font-semibold hover:text-gray-500 transition">
            About Us
          </Link>
          <Link to="/contact" className="font-semibold hover:text-gray-500 transition">
            Customer Service
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="font-semibold hover:text-gray-500 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="font-semibold hover:text-gray-500 transition">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className="flex md:hidden justify-between items-center">
        {/* Hamburger */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl">
          {mobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Auth */}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="font-semibold">
            Logout
          </button>
        ) : (
          <Link to="/login" className="font-semibold">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-20 flex flex-col gap-2 p-4 md:hidden">
          {/* Categories */}
          <details>
            <summary className="cursor-pointer font-semibold flex items-center gap-2">
              <IoMenu /> All Categories
            </summary>
            <div className="mt-2">
              {categories.map((category) => (
                <Link
                  to={`/products?category=${category._id}`}
                  key={category._id}
                  className="block px-2 py-1 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </details>

          {/* Links */}
          <button onClick={() => scrollToSection('best-sellers')} className="text-left font-semibold">
            Best Sellers
          </button>
          <button onClick={() => scrollToSection('deals')} className="text-left font-semibold">
            Deals of the Day
          </button>
          <button onClick={() => scrollToSection('new-arrivals')} className="text-left font-semibold">
            New Arrivals
          </button>
          <button onClick={() => scrollToSection('discounted')} className="text-left font-semibold">
            Discounted Products
          </button>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="font-semibold">
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="font-semibold">
            Customer Service
          </Link>
        </div>
      )}
    </div>
  );
};

export default BottomBar;