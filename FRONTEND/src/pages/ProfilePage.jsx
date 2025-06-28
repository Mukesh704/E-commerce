import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/');
  }

  if (loading) return <p>Loading profile...</p>
  if (!user) return <p>Could not load user profile.</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        <Button onClick={handleLogout} variant="secondary">Logout</Button>
      </div>

      <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {/* Order history would be fetched and displayed here */}
          <p>You have no past orders.</p>
      </div>
    </div>
  );
};

export default ProfilePage;