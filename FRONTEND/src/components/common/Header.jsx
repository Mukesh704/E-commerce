import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoryContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { searchProducts } from '../../services/api';

const Header = () => {
  const { categories } = useCategories();
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const { data } = await searchProducts(searchQuery.trim());

      if (data.success && Array.isArray(data.productIds)) {
        sessionStorage.setItem('searchProductIds', JSON.stringify(data.productIds));
      } else {
        sessionStorage.removeItem('searchProductIds');
      }

      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <header className="w-full z-50 relative bg-white">
      <div className="py-3 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
          <Link to="/" className="hover:text-black">UrbanBasket</Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex-1 flex justify-center order-3 sm:order-2 w-full sm:w-auto"
        >
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              aria-label="Search"
            >
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4 text-xl whitespace-nowrap order-2 sm:order-3">
          <Link to="/profile" className="hover:text-black">
            <AiOutlineUser />
          </Link>

          <Link to="/wishlist" className="relative hover:text-black">
            <AiOutlineHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-black">
            <AiOutlineShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;