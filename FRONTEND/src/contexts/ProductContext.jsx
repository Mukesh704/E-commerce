// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getProducts } from '../services/api';

// const ProductContext = createContext();

// export const useProducts = () => useContext(ProductContext);

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await getProducts();
//         setProducts(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch products.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const value = { products, loading, error };

//   return (
//     <ProductContext.Provider value={value}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProducts } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts();
        if (data.success) {
          setProducts(data.products || []);
          setError(null);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = { products, loading, error };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
