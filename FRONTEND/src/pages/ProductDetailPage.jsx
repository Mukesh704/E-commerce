import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    // In a real app, you might fetch a single product by ID
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
        setProduct(foundProduct);
        // Assuming colors are part of product data, e.g., product.colors = ['red', 'black', 'green']
        if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
        }
    }
  }, [id, products]);

  if (!product) return <div className="text-center py-10">Loading...</div>;
  
  const handleAddToCart = () => {
      addToCart({ ...product, qty: quantity });
      // Optionally, show a confirmation message
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div>
          <img src={product.imageUrl || 'https://via.placeholder.com/600'} alt={product.name} className="w-full rounded-lg shadow-lg"/>
          {/* Thumbnail images can be mapped here */}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.shortDescription || 'A perfect balance of exhilarating high-fidelity audio.'}</p>
          <div className="my-4">
            {/* Star ratings would go here */}
            <span className="text-gray-600">(121)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          <p className="text-gray-500">Suggested payments with 6 months special financing</p>

          {/* Color Selector */}
          <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Choose a Color</h3>
              <div className="flex space-x-2">
                  {/* Example Colors */}
                  {['#E44D5A', '#333333', '#EAEAEA', '#3B5998', '#CCCCCC'].map(color => (
                      <button key={color}
                          onClick={() => setSelectedColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-transparent'}`}
                      />
                  ))}
              </div>
          </div>
          
          {/* Quantity and Actions */}
          <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold">-</button>
                  <span className="px-4 py-2 text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-bold">+</button>
              </div>
              <p className="text-orange-500 font-semibold">Only 12 Items Left!</p>
          </div>

          <div className="mt-8 flex space-x-4">
            <Button onClick={handleAddToCart} className="flex-grow">Add to Cart</Button>
            <Button variant="secondary" className="flex-grow">Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;