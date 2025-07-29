import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoryContext';
import { IoMenu } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

const BottomBar = () => {
  const { categories } = useCategories();
  const [showCategories, setShowCategories] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-black text-white px-6 py-3 flex justify-between items-center relative">
      {/* Left Section: All Categories + About Us + Customer Service */}
      <div className="flex items-center gap-6">
        {/* All Categories Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <div className="flex items-center gap-2 font-semibold cursor-pointer">
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

        {/* Additional Links */}
        <Link to="/about" className="hover:underline">
          About Us
        </Link>
        <Link to="/contact" className="hover:underline">
          Customer Service
        </Link>
      </div>

      {/* Right Section: Auth */}
      <div className="flex items-center gap-4 text-sm">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomBar;