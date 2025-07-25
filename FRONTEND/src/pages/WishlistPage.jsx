import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/products/ProductCard';

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const profileRes = await api.get('/users/me');
        if (profileRes.data.success) {
          const wishlistIds = profileRes.data.response.wishlist;
          const productPromises = wishlistIds.map((id) =>
            api.get(`/products/${id}`)
          );
          const productResults = await Promise.all(productPromises);
          const products = productResults.map((res) => res.data.response);
          setWishlistProducts(products);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p>You have no items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
