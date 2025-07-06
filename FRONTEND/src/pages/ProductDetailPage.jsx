import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, submitReview } from '../services/api';
import axios from 'axios';
import Button from '../components/common/Button';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data.response);
    } catch (err) {
      console.error('Failed to load product', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/reviews/${id}`);
      setReviews(data.response || []);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchProduct();
      await fetchReviews();
      setLoading(false);
    })();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewInput.rating || !reviewInput.comment.trim()) return;

    try {
      await submitReview(id, reviewInput);
      setReviewInput({ rating: 0, comment: '' });
      await fetchProduct();
      await fetchReviews();
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('You must be logged in to post a review.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center text-red-500">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Info */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-green-600 mb-2">₹{product.price}</p>
      <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
      </p>
      <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      <div className="mt-4">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-72 h-72 object-cover border rounded"
        />
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="border p-4 rounded bg-gray-50">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="italic text-gray-700 mt-1">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-1">- {review.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Rating:</label>
            <select
              value={reviewInput.rating}
              onChange={(e) =>
                setReviewInput({ ...reviewInput, rating: parseInt(e.target.value) })
              }
              className="border p-2 rounded w-32"
            >
              <option value={0}>Select</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Comment:</label>
            <textarea
              value={reviewInput.comment}
              onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
              className="w-full border p-2 rounded h-24"
              placeholder="Write your review..."
            />
          </div>
          <Button type="submit" className="bg-blue-600 text-white">
            Submit Review
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetailPage;
