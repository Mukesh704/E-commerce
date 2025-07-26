import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import BestSellersSection from '../components/products/BestSellersSection'; // NEW
import heroImage from '../assets/images/hero-bg.jpg';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-yellow-50 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                Shopping And Department Store.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
              </p>
              <Link to="/products">
                <button className="bg-green-800 text-white py-3 px-10 rounded-lg text-lg font-semibold hover:bg-green-900 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img src={heroImage} alt="Shopping items" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <BestSellersSection />

      {/* Regular Product List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Products For You!</h2>
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;