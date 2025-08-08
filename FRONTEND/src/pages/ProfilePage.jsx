import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import WishlistSliderSection from '../components/common/WishlistSliderSection';
import ProductCard from '../components/products/ProductCard';
import { AiOutlineDelete } from 'react-icons/ai';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, profileRes, addressRes] = await Promise.all([
          api.get('/orders'),
          api.get('/users/me'),
          api.get('/address'),
        ]);

        if (orderRes.data.success) {
          setOrders(orderRes.data.response);
        }

        if (profileRes.data.success) {
          const wishlistIds = profileRes.data.response.wishlist;
          const productPromises = wishlistIds.map((id) =>
            api.get(`/products/${id}`)
          );
          const productResults = await Promise.all(productPromises);
          const products = productResults.map((res) => res.data.response);
          setWishlistProducts(products);
        }

        if (addressRes.data.success) {
          setAddresses(addressRes.data.response);
          const defaultAddress = addressRes.data.response.find(
            (addr) => addr.isDefault
          );
          if (defaultAddress) setSelectedAddressId(defaultAddress._id);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user) fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddressChange = async (id) => {
    const previousDefault = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    try {
      if (previousDefault && previousDefault._id !== id) {
        await api.put(`/address/${previousDefault._id}`, { isDefault: false });
      }
      await api.put(`/address/${id}`, { isDefault: true });
      setSelectedAddressId(id);
    } catch (err) {
      console.error('Failed to update default address:', err);
    }
  };

  const handleAddAddress = () => navigate('/add-address');

  const handleDeleteAddress = async (e, id) => {
    e.stopPropagation();

    if (id === selectedAddressId) {
      alert("You can't delete the default address.");
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this address?'
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/address/${id}`);
      const updated = addresses.filter((addr) => addr._id !== id);
      setAddresses(updated);
    } catch (err) {
      console.error('Failed to delete address:', err);
      alert('Could not delete the address. Try again.');
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-600">Loading profile...</p>;
  if (!user) return <p className="text-center py-10 text-red-600">Could not load user profile.</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
        <span className="relative font-bold text-gray-800 z-10">My Profile</span>
        <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
      </h2>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <div className="mb-4">
          <p className="text-lg text-gray-800 mb-1">
            <span className="font-semibold">Name:</span>{' '}
            <span className="capitalize">{user.name}</span>
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-semibold">Email:</span>{' '}
            <span>{user.email}</span>
          </p>
        </div>

        {/* Address Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-gray-800">My Addresses</h3>
            <Button onClick={handleAddAddress} className="bg-black text-white hover:bg-gray-300 hover:text-black">Add Address</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr._id;
              return (
                <div
                  key={addr._id}
                  onClick={() => handleAddressChange(addr._id)}
                  className={`relative cursor-pointer border p-4 rounded-lg transition duration-200 group flex justify-between items-start ${isSelected ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800'}`}
                >
                  <div className="text-sm leading-snug flex-1">
                    {`${addr.address}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}
                  </div>

                  {!isSelected && (
                    <button
                      onClick={(e) => handleDeleteAddress(e, addr._id)}
                      className="ml-3 text-red-500 hover:text-red-700"
                      title="Delete Address"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={() => navigate('/change-password')} className='hover:bg-gray-300 hover:text-black'>Change Password</Button>
        </div>
      </div>

      {/* Wishlist Section */}
      <WishlistSliderSection wishlistProducts={wishlistProducts} navigate={navigate} />

      {/* Orders Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
          <span className="relative z-10">My Orders</span>
          <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">You have no past orders.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="block rounded-lg p-5 bg-white shadow-md hover:bg-gray-100 transition"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">Status: {order.orderStatus}</p>
                    <p className="text-sm text-gray-600">Total: ₹{order.totalPrice} | Items: {order.orderItems.length}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs">{order.paymentMethod}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button at the Bottom */}
      <div className="text-center mt-16">
        <div className="flex gap-4 mt-6 justify-center">
          <Button onClick={handleLogout} className='hover:bg-gray-300 hover:text-black'>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;