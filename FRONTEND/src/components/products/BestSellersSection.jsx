import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
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

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Best Sellers</h2>
        <Slider {...settings}>
          {bestSellers.map((product) => (
            <div key={product._id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BestSellersSection;