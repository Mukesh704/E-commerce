import React, { useEffect, useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import { useLocation } from 'react-router-dom';
import { getProductsBulk } from '../services/api';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedIds = sessionStorage.getItem('searchProductIds');
        if (!storedIds) {
          setResults([]);
          setLoading(false);
          return;
        }

        const ids = JSON.parse(storedIds);
        if (!ids.length) {
          setResults([]);
          setLoading(false);
          return;
        }

        const { data } = await getProductsBulk(ids);

        if (data.success && Array.isArray(data.products)) {
          setResults(data.products);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!results.length) return <p className="text-center text-gray-500 mt-6 text-lg">No products found for "{query}".</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-1">
        {results.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;