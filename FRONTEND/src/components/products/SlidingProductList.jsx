import React from 'react';
import Slider from 'react-slick';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const SlidingProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-500 text-lg">No products found.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full px-4">
      <Slider {...settings} className="slick-theme">
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlidingProductList;