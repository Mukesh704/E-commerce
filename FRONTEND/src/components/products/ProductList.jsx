import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const ProductList = ({ categoryId }) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  const filteredProducts = categoryId
    ? products.filter((product) => product.categories.includes(categoryId))
    : products;

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p className="text-center text-gray-500 text-lg">No products found for this category.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;