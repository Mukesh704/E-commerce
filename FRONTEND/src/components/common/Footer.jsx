import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Footer = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories/category-display');
        const data = [
          res.data.category1,
          res.data.category2,
          res.data.category3,
          res.data.category4,
          res.data.category5,
        ];
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">UrbanBasket</h3>
          <p className="text-gray-400 mb-4">
            A perfect place to find all your needs. High-quality products and unbeatable prices.
          </p>
          <p className="text-gray-400">Bhilai, Chhattisgarh</p>
          <p className="text-gray-400">mukeshdalai101@gmail.com</p>
          <p className="text-gray-400">prashogeditz@gmail.com</p>
          <p className="text-gray-400">dewanshpatel52@gmail.com</p>
          <p className="text-gray-400">Mon - Sat: 10:00 - 18:00</p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link smooth to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link smooth to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link smooth to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-4">Account</h4>
          <ul className="space-y-2">
            {localStorage.getItem('token') ? (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}
                  className="hover:text-white text-left"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link smooth to="/login" className="hover:text-white">Sign In</Link>
              </li>
            )}
            <li><Link smooth to="/cart" className="hover:text-white">View Cart</Link></li>
            <li><Link smooth to="/wishlist" className="hover:text-white">My Wishlist</Link></li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4">Popular Categories</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat._id}
                onClick={() => navigate(`/products?category=${cat._id}`)}
                className="hover:text-white cursor-pointer transition"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Install App & Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Install App</h4>
          <div className="flex space-x-2 mb-4">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-10"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10"
            />

          </div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
            <a href="#" aria-label="Pinterest" className="hover:text-white"><FaPinterest /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        © 2025 UrbanBasket. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;