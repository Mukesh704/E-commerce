import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await getWishlist();
      if (data.success) {
        setWishlist(data.response); // Assume this returns an array of product objects or IDs
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const add = async (productId) => {
    try {
      await addToWishlist(productId);
      fetchWishlist();
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const remove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      fetchWishlist();
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item._id === productId || item === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, add, remove, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};