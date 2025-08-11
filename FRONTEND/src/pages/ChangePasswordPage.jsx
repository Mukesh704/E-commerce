import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ChangePasswordPage = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await changePassword({ oldPass, newPass });
      setMessage(res.data.message);

      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Password change failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-2 border rounded"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-300 hover:text-black"
        >
          Change Password
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ChangePasswordPage;