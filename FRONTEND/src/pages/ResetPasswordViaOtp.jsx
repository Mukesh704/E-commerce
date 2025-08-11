import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordViaOtp } from '../services/api';

const ResetPasswordViaOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.email && location.state?.otp) {
      setEmail(location.state.email);
      setOtp(location.state.otp);
    } else {
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordViaOtp(email, otp, newPassword);
      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Password reset failed');
    }
  };

  return (
    <div className="flex items-center justify-center px-2 py-4 bg-gray-50 min-h-[50vh]">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-5 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-3">
          <input
            type="email"
            className="border p-2 w-full rounded bg-gray-100 text-sm"
            value={email}
            disabled
          />
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-100 text-sm"
            value={otp}
            disabled
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 w-full rounded text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-300 hover:text-black px-4 py-2 rounded w-full text-sm"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-3 text-xs text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordViaOtp;