import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Shopcart</Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-800">Categories</Link>
          {/* ... other nav links */}
        </nav>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-600 hover:text-gray-800">Hi, {user?.name}</Link>
              <button onClick={logout} className="text-gray-600 hover:text-gray-800">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-800">Account</Link>
          )}
          <Link to="/cart" className="relative text-gray-600 hover:text-gray-800">
            Cart
            {cartItems.length > 0 && (
                 <span className="absolute -top-2 -right-4 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;