// import React from 'react';
// import { useProducts } from '../../contexts/ProductContext';
// import ProductCard from './ProductCard';

// const ProductList = () => {
//   const { products, loading, error } = useProducts();

//   if (loading) return <p className="text-center">Loading products...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {products.map(product => (
//         <ProductCard key={product._id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!products || !Array.isArray(products)) {
    return <p className="text-center text-red-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
