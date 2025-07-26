import React, { useEffect, useState } from 'react';
import { getBestSellers } from '../../services/api';
import ProductCard from './ProductCard';

const BestSellersSection = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await getBestSellers();
        setBestSellers(res.data.response);
      } catch (err) {
        setError('Failed to load bestsellers');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading bestsellers...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
